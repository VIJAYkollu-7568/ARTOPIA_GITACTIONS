package com.example.demo.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "art_gallery")
@Getter
@Setter
public class Art {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String artName;

    @Column(nullable = false, length = 1000)
    private String artDescription;

    @Column(nullable = false)
    private String artistName;

    @Column(nullable = false)
    private Double artCost;

    @Lob
    @Column(nullable = false, columnDefinition = "LONGBLOB")
    private byte[] artPicture;
// Stores the image as BLOB
}
