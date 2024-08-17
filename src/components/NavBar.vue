<template>
    <nav class="navbar navbar-expand-lg bg-dark-subtle position-sticky">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">
          <img class="img-thumbnail" src=" https://awhendr261101.github.io/allImages/images/surveycorps.jpg" alt="logo" loading="lazy" >
      </router-link>
  
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
  
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto me-5 mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" href="#landing">Home</router-link>
          </li>
          <li class="nav-item">
            <Router-link to> About </Router-link>
          </li>
          <li class="nav-item dropdown">
              <a class="nav-link" href="#resume">Resume</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#projects" >Projects</a>
          </li>
          <li class="nav-item">
              <a href="#testimonials" class="nav-link">Testimonials</a>
          </li>
          <li class="nav-item">
              <a href="#reachme" class="nav-link">Reach Me</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  </template>
  
  <script>
  export default {
    name : "FooterComp"
  }
  </script>
  
  <style>
  
  </style>