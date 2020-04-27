package com.launchacademy.springeditanddelete.controllers.api.v1;

import com.launchacademy.springeditanddelete.models.Contractor;
import com.launchacademy.springeditanddelete.repositories.ContractorRepository;
import java.util.Optional;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/contractors")
public class ContractorsAPIController {
  @Autowired
  private ContractorRepository contractorRepo;

  private class ContractorNotFoundException extends RuntimeException {};

  @ControllerAdvice
  private class ContactorNotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(ContractorNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String urlNotFoundHandler(ContractorNotFoundException ex) {
      return ex.getMessage();
    }
  }

  private class InvalidContractorException extends RuntimeException {};
  @ControllerAdvice
  private class InvalidContractorAdvice {
    @ResponseBody
    @ExceptionHandler(InvalidContractorException.class)
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    String invalidContractor(InvalidContractorException ic) {
      return "";
    }
  }

//  @GetMapping
//  public Iterable<Contact> getList() {
//    return contactRepo.findAll();
//  }

  @GetMapping
  public Iterable<Contractor> getList() {
    return contractorRepo.findAll();
  }

  @GetMapping("/{id}")
  public Contractor getOne(@PathVariable Integer id) {
    return contractorRepo.findById(id).orElseThrow(() -> new ContractorNotFoundException());
  }

  @PostMapping
  public Contractor create(@RequestBody @ModelAttribute Contractor contractor, BindingResult result) {
    if(result.hasErrors()) {
      throw new InvalidContractorException();
    }
    else {
      return contractorRepo.save(contractor);
    }

  }
}
