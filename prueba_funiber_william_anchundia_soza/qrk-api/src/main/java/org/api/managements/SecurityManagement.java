package org.api.managements;

import org.api.models.Person;
import org.api.objects.ResponseStandarBuilder;
import org.api.services.JwtService;
import org.api.services.SecurityService;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class SecurityManagement {

    @Inject
    SecurityService securityService;
    @Inject
    JwtService jwtService;

    public Response getPersonaForEmailPassword(String email, String password){
        try{
            Person person = this.securityService.getPersonaForEmailPassword(email, password);
            if(person.getId() == null){
                return ResponseStandarBuilder.responseSingle(Response.Status.BAD_REQUEST, "No hay resultados");
            }
            return ResponseStandarBuilder.responseObject(Response.Status.OK, jwtService.generateJwt(), person);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseStandarBuilder.responseObject(Response.Status.INTERNAL_SERVER_ERROR, "Problemas al obtener ALLForId ", e.getMessage());
        }
    }

    public Response getAllPrueba(){
        try {
            List<Person> people = new ArrayList<>();
            people.addAll(this.securityService.getAll());
            if (people.isEmpty()) {
                return ResponseStandarBuilder.responseSingle(Response.Status.BAD_REQUEST, "No hay resultados");
            }
            return ResponseStandarBuilder.responseObject(Response.Status.OK, "Sin novedades", people);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseStandarBuilder.responseObject(Response.Status.INTERNAL_SERVER_ERROR, "Problemas al obtener ALL ", e.getMessage());
        }
    }

    public Response getPersonaForId(Integer id){
        try{
            Person person = this.securityService.getPersonaForId(id);
            if(person.getId() == null){
                return ResponseStandarBuilder.responseSingle(Response.Status.BAD_REQUEST, "No hay resultados");
            }
            return ResponseStandarBuilder.responseObject(Response.Status.OK, "Creado sin novedades", person);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseStandarBuilder.responseObject(Response.Status.INTERNAL_SERVER_ERROR, "Problemas al obtener ALLForId ", e.getMessage());
        }
    }

    public Response postPrueba(Person person){
        try{
            this.securityService.create(person);
            return ResponseStandarBuilder.responseSingle(Response.Status.OK,"Sin novidades");
        }catch (Exception e ){
            return ResponseStandarBuilder.responseObject(Response.Status.INTERNAL_SERVER_ERROR, "Problemas al CREAR LA PERSONA", e.getMessage());
        }
    }

    public Response putPrueba(Person person){
        try{
            this.securityService.update(person);
            return ResponseStandarBuilder.responseSingle(Response.Status.OK,"Actualizado sin novidades");
        }catch (Exception e ){
            return ResponseStandarBuilder.responseObject(Response.Status.INTERNAL_SERVER_ERROR, "Problemas al CREAR LA PERSONA", e.getMessage());
        }
    }

    public Response deletePrueba(Integer id){
        try{
            Person person = this.securityService.getPersonaForId(id);
            if(person.getId() == null){
                return ResponseStandarBuilder.responseSingle(Response.Status.BAD_REQUEST, "El usuario no existe");
            }
            this.securityService.delete(person);
            return ResponseStandarBuilder.responseSingle(Response.Status.OK,"Eliminado sin novidades");
        }catch (Exception e ){
            return ResponseStandarBuilder.responseObject(Response.Status.INTERNAL_SERVER_ERROR, "Problemas al eliminar LA PERSONA", e.getMessage());
        }
    }
}
