package com.example.demo.controllers;


import com.example.demo.models.Art;
import com.example.demo.repos.ArtRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/art")
@CrossOrigin(origins = "*")
public class ArtController {

    @Autowired
    private ArtRepository artRepository;

    // Upload new art
    @PostMapping("/upload")
    public ResponseEntity<String> uploadArt(
            @RequestParam("artName") String artName,
            @RequestParam("artDescription") String artDescription,
            @RequestParam("artistName") String artistName,
            @RequestParam("artCost") Double artCost,
            @RequestParam("artPicture") MultipartFile artPicture
    ) {
        try {
            Art art = new Art();
            art.setArtName(artName);
            art.setArtDescription(artDescription);
            art.setArtistName(artistName);
            art.setArtCost(artCost);
            art.setArtPicture(artPicture.getBytes());

            artRepository.save(art);
            return ResponseEntity.ok("Art uploaded successfully!");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to upload image: " + e.getMessage());
        }
    }

    // Get all arts
    @GetMapping("/all")
    public List<Art> getAllArts() {
        return artRepository.findAll();
    }

    // Get single art by ID
    @GetMapping("/{id}")
    public ResponseEntity<Art> getArtById(@PathVariable Long id) {
        Optional<Art> art = artRepository.findById(id);
        return art.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get image only by ID
    @GetMapping("/{id}/image")
    public ResponseEntity<byte[]> getArtImage(@PathVariable Long id) {
        Optional<Art> art = artRepository.findById(id);
        if (art.isPresent()) {
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + art.get().getArtName() + ".jpg\"")
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(art.get().getArtPicture());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Update art post
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateArt(
            @PathVariable Long id,
            @RequestParam("artName") String artName,
            @RequestParam("artDescription") String artDescription,
            @RequestParam("artistName") String artistName,
            @RequestParam("artCost") Double artCost,
            @RequestParam(value = "artPicture", required = false) MultipartFile artPicture
    ) {
        Optional<Art> optionalArt = artRepository.findById(id);
        if (optionalArt.isPresent()) {
            Art art = optionalArt.get();
            art.setArtName(artName);
            art.setArtDescription(artDescription);
            art.setArtistName(artistName);
            art.setArtCost(artCost);

            if (artPicture != null && !artPicture.isEmpty()) {
                try {
                    art.setArtPicture(artPicture.getBytes());
                } catch (IOException e) {
                    return ResponseEntity.status(500).body("Failed to update image: " + e.getMessage());
                }
            }

            artRepository.save(art);
            return ResponseEntity.ok("Art updated successfully!");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete art post
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteArt(@PathVariable Long id) {
        if (artRepository.existsById(id)) {
            artRepository.deleteById(id);
            return ResponseEntity.ok("Art deleted successfully!");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
