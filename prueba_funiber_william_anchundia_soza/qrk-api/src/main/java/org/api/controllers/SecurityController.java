package org.api.controllers;

import org.api.managements.SecurityManagement;
import org.api.models.Person;
import org.api.objects.Prueba;
import org.eclipse.microprofile.metrics.annotation.Timed;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.enums.SchemaType;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("security")
@RequestScoped
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Timed
public class SecurityController {

    @Inject
    SecurityManagement securityManagement;

    @GET
    @RolesAllowed({"Admin"})
    @Operation(summary = "Obtener todos", description = "Obtener todos")
    @APIResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(type = SchemaType.ARRAY,
            implementation = Prueba.class, name = "Prueba"), mediaType = MediaType.APPLICATION_JSON))
    @APIResponse(responseCode = "400", description = "Bad Request")
    @APIResponse(responseCode = "500", description = "Internal Server Error")
    public Response getPrueba() {
        return this.securityManagement.getAllPrueba();
    }

    @GET
    @RolesAllowed({"Admin"})
    @Path("prueba2/{id}")
    @Operation(summary = "Obtener todos por id", description = "Obtener todos por id")
    @APIResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(type = SchemaType.ARRAY,
            implementation = Prueba.class, name = "Prueba"), mediaType = MediaType.APPLICATION_JSON))
    @APIResponse(responseCode = "400", description = "Bad Request")
    @APIResponse(responseCode = "500", description = "Internal Server Error")
    public Response myPatch(@PathParam("id") Integer id){
        return this.securityManagement.getPersonaForId(id);
    }

    @GET
    @PermitAll
    @Path("logeo/{email}/{password}")
    @Operation(summary = "Obtener todos por id", description = "logeo del usuario por usuario y clave")
    @APIResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(type = SchemaType.ARRAY,
            implementation = Prueba.class, name = "Prueba"), mediaType = MediaType.APPLICATION_JSON))
    @APIResponse(responseCode = "400", description = "Bad Request")
    @APIResponse(responseCode = "500", description = "Internal Server Error")
    public Response myPatch(@PathParam("email") String email, @PathParam("password") String password){
        return this.securityManagement.getPersonaForEmailPassword(email, password);
    }

    @POST
    @RolesAllowed({"Admin"})
    @Operation(summary = "Crear", description = "Crea un nuevo")
    @RequestBody(content = @Content(mediaType = MediaType.APPLICATION_JSON, schema = @Schema(type = SchemaType.OBJECT,
            implementation = Person.class)), description = "prueba VM", required = true)
    @APIResponse(responseCode = "200", description = "OK")
    @APIResponse(responseCode = "400", description = "Bad Request")
    @APIResponse(responseCode = "500", description = "Internal Server Error")
    public Response crearPrueba(Person person){
        return this.securityManagement.postPrueba(person);
    }

    @PUT
    @RolesAllowed({"Admin"})
    @Operation(summary = "Modificar", description = "modificar elemento")
    @RequestBody(content = @Content(mediaType = MediaType.APPLICATION_JSON, schema = @Schema(type = SchemaType.OBJECT,
            implementation = Person.class)), description = "prueba VM", required = true)
    @APIResponse(responseCode = "200", description = "OK")
    @APIResponse(responseCode = "400", description = "Bad Request")
    @APIResponse(responseCode = "500", description = "Internal Server Error")
    public Response modificarPrueba(Person person){
        return this.securityManagement.putPrueba(person);
    }

    @DELETE
    @Path("{id}")
    @RolesAllowed({"Admin"})
    @Operation(summary = "eliminar", description = "eliminar objeto")
    @APIResponse(responseCode = "200", description = "OK")
    @APIResponse(responseCode = "400", description = "Bad Request")
    @APIResponse(responseCode = "500", description = "Internal Server Error")
    public Response eliminarPrueba(@PathParam("id") Integer id){
        return this.securityManagement.deletePrueba(id);
    }
}
