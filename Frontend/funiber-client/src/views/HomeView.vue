<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavbarView from "../views/Layouts/NavbarView.vue";
</script>
<template>
  <NavbarView></NavbarView>
  <!-- About-->
  <section >
      <div>
        <h1 class="mb-0">
          Jordan
          <span class="text-primary">Rodriguez</span>
        </h1>
        <div class="subheading mb-5">
          +593986052309 • Guayaquil, Guayas
          <a href="mailto:name@email.com">jordan_r_a@hotmail.es</a>
        </div>
        <p class="lead mb-5">Programador con amplia trayectoria y experiencia generando códigos para empresas de distintos sectores, formando parte de proyectos novedosos en su tecnología y optimizando procesos de gestión para una gran empresa de telecomunicación del país.
          Dispuesto aportar con la mayor cantidad y calidad de mis conocimientos al cumplimiento de la misión y visión institucional. Desarrollando procesos transaccionales, para interfaces Windows, Web.
        </p>
      </div>
    </section>
    <hr class="m-0" />
    <!-- Experience-->
    <section >
      <div >
        <h2 class="mb-5">HISTORIAL LABORAL</h2>
        <div class="d-flex flex-column flex-md-row justify-content-between mb-5">
          <div class="flex-grow-1">
            <h3 class="mb-0">DEVELOPER FULL STACK</h3>
            <div class="subheading mb-3">
              ESTUDIO JURÍDICO ROMERO D & ASOCIADOS             
            </div>
            <p>-Encargado de realizar levantamiento de información, análisis y desarrollo de requerimientos con sus respectivos testing.<br>
              -Ejecutar mantenimiento de softwares con tecnologías como: PHP Laravel, VB.Net, C#, MVC, Java Form y Vue.js.<br>
              -Optimizar el sistema de cobranzas -cobros-, basado en Vb.Net y SQL Server.<br>
              -Creación de aplicativos externos que permitan aligerar la carga operativa del personal.<br>
              -Replicación y monitoreo de BD Sql Server.
            </p>
          </div>
          <div class="flex-shrink-0">
            <span class="text-primary">05/2019 – Hasta la Actualidad</span>
          </div>
        </div>
        <div class="d-flex flex-column flex-md-row justify-content-between mb-5">
          <div class="flex-grow-1">
            <h3 class="mb-0">ANALISTA DEARROLLADOR</h3>
            <div class="subheading mb-3">GENERAL AIR S.A</div>
            <p>-Hacer más eficiente el sistema de pesaje, basado en VB.Net, C# y MySQL.<br>
              -Consumo de WS, que permiten enviar informe de la carga procesada a las aduanas del Ecuador.<br>
              -Creación de reportes correspondiente a los procesos realizados.<br>
              -Crear un Sistema de Control de Temperatura basado en Arduino, VB.Net y MySQL.<br>
              -Implementar mejoras en el sistema de marcación con reconocimiento facial, el cual se basa en APIs de integración de RF de Microsoft</p>
          </div>
          <div class="flex-shrink-0">
            <span class="text-primary"> 10/2017 – 05/2019</span>
          </div>
        </div>
        <div class="d-flex flex-column flex-md-row justify-content-between mb-5">
          <div class="flex-grow-1">
            <h3 class="mb-0">INGENIERO TÉCNICO</h3>
            <div class="subheading mb-3">Shout! Media Productions</div>
            <p>-Realizar el levantamiento de información, análisis y desarrollo de requerimientos.<br>
              -Optimizar procesos de PLSQL.<br>
              -Crear bash para la ejecución paralela de procesos en PLSQL.<br>
              -Crear reportes en Oracle Forms para análisis del área de Cobranzas y Facturación.</p>
          </div>
          <div class="flex-shrink-0">
            <span class="text-primary">10/2013 - 10/2017</span>
          </div>
        </div>
      </div>
    </section>
    <hr class="m-0" />
    <!-- Education-->
    <section >
      <div >
        <h2 class="mb-5">Educacion</h2>
        <div class="d-flex flex-column flex-md-row justify-content-between mb-5">
          <div class="flex-grow-1">
            <h3 class="mb-0">Universidad de Estatal de Guayaquil</h3>
            <div>Ingeniería en Sistemas Administrativos Computarizados</div>
          </div>
          <div class="flex-shrink-0">
            <span class="text-primary">2014</span>
          </div>
        </div>
      </div>
    </section>
    <hr class="m-0" />
    <!-- Skills-->
    <section >
      <div >
        <h2 class="mb-5">Skills</h2>
        <div class="subheading mb-3">Programming Languages & Tools</div>
        <ul>
          <li>VB.Net (Form).</li>
          <li>PHP(Laravel/Codeigniter).</li>
          <li>C# (MVC).</li>
          <li>Vue</li>
          <li>Javascript.</li>
          <li>SQL Server.</li>
          <li>MySql.</li>
          <li>PL-SQL (BD: Oracle10G)</li>
        </ul>
      </div>
    </section>
    <!-- Awards-->
    <section >
      <div>
        <h2 class="mb-5">FORMACIÓN COMPLEMENTARIA Y OTROS CONOCIMIENTOS</h2>
        <ul class="mb-0">
          <li>
            Scrum Foundation Professional Certificate (SFPC)
          </li>
          <li>
            Scrum Master Professional Certificate (SMPC®).
          </li>
          <li>
            C# Fundamentals with NET Core 2.1
          </li>
          <li>
            Introduction to Laravel.
          </li>
          <li>
            PHP course with Composer
          </li>
          <li>
            Laravel 6 Introduction Course
          </li>
          <li>
            Laravel 8 Introduction Course.
          </li>
          <li>
            REST API course with PHP.
          </li>
          <li>
            Laravel Data Management with Eloquent ORM.
          </li>
          <li>
            Vue.js Basic Course 2.
          </li>
          <li>
            Python Fundamentals Course.
          </li>
          <li>
            Python Course: Comprehensions, Functions and Error Handling.
          </li>
          <li>
            Python Hands-on Course: Creating a CRUD.
          </li>          
        </ul>
      </div>
    </section>
 <RouterView></RouterView>
</template>