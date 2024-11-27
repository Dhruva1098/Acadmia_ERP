package com.dhruva.student.service;

import com.dhruva.student.model.Domain;
import com.dhruva.student.repository.DomainRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DomainService {

    private final DomainRepository domainRepository;

    public DomainService(DomainRepository domainRepository) {
        this.domainRepository = domainRepository;
    }

    public List<Domain> getAllDomains() {
        return domainRepository.findAll();
    }

    public Domain getDomainById(Long id) {
        Optional<Domain> domain = domainRepository.findById(id);
        return domain.orElse(null); // Return null if not found
    }
}