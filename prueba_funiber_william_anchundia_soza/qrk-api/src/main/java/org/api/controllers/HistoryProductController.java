package org.api.controllers;

import org.api.managements.HistoryProductManagement;
import org.api.models.CategoryProduct;
import org.api.models.HistoryProduct;
import org.eclipse.microprofile.metrics.annotation.Timed;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.enums.SchemaType;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;

import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("history-product")
@RequestScoped
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Timed
public class HistoryProductController {

    @Inject
    HistoryProductManagement historyProductManagement;

    @GET
    @RolesAllowed({"Admin"})
    @Path("{id}")
    @Operation(summary = "Obtener todos por id", description = "Obtener todos por id")
    @APIResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(type = SchemaType.ARRAY,
            implementation = HistoryProduct.class, name = "Product"), mediaType = MediaType.APPLICATION_JSON))
    @APIResponse(responseCode = "400", description = "Bad Request")
    @APIResponse(responseCode = "500", description = "Internal Server Error")
    public Response myPatch(@PathParam("id") Integer id){
        return this.historyProductManagement.getHistoryProductForId(id);
    }

    @GET
    @RolesAllowed({"Admin"})
    @Path("all")
    @Operation(summary = "Obtener todos", description = "Obtener todos")
    @APIResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(type = SchemaType.ARRAY,
            implementation = HistoryProduct.class, name = "Product"), mediaType = MediaType.APPLICATION_JSON))
    @APIResponse(responseCode = "400", description = "Bad Request")
    @APIResponse(responseCode = "500", description = "Internal Server Error")
    public Response myPatch(){
        return this.historyProductManagement.getAllHistoryProducts();
    }
}
