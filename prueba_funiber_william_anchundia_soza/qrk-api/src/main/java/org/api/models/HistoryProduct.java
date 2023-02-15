package org.api.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "historyproduct")
public class HistoryProduct {

    @Id
    @Column(name = "id_history_product")
    private Integer idHistoryProduct;

    @Column(name = "id_product")
    private Integer idProduct;

    @Column(name = "code_product")
    private String codeProduct;

    @Column(name = "name_product")
    private String nameProduct;

    @Column(name = "id_category_product")
    private Integer idCategoryProduct;

    @Column(name = "email_update")
    private String emailUpdate;

    public LocalDateTime getDateUpdate() {
        return dateUpdate;
    }

    public void setDateUpdate(LocalDateTime dateUpdate) {
        this.dateUpdate = dateUpdate;
    }

    @Column(name= "date_update")
    private LocalDateTime dateUpdate;

    public Integer getIdHistoryProduct() {
        return idHistoryProduct;
    }

    public void setIdHistoryProduct(Integer idHistoryProduct) {
        this.idHistoryProduct = idHistoryProduct;
    }

    public Integer getIdProduct() {
        return idProduct;
    }

    public void setIdProduct(Integer idProduct) {
        this.idProduct = idProduct;
    }

    public String getCodeProduct() {
        return codeProduct;
    }

    public void setCodeProduct(String codeProduct) {
        this.codeProduct = codeProduct;
    }

    public String getNameProduct() {
        return nameProduct;
    }

    public void setNameProduct(String nameProduct) {
        this.nameProduct = nameProduct;
    }

    public Integer getIdCategoryProduct() {
        return idCategoryProduct;
    }

    public void setIdCategoryProduct(Integer idCategoryProduct) {
        this.idCategoryProduct = idCategoryProduct;
    }

    public String getEmailUpdate() {
        return emailUpdate;
    }

    public void setEmailUpdate(String emailUpdate) {
        this.emailUpdate = emailUpdate;
    }

    public HistoryProduct() {
    }

    public HistoryProduct(Integer idHistoryProduct, Integer idProduct, String codeProduct, String nameProduct, Integer idCategoryProduct, String emailUpdate) {
        this.idHistoryProduct = idHistoryProduct;
        this.idProduct = idProduct;
        this.codeProduct = codeProduct;
        this.nameProduct = nameProduct;
        this.idCategoryProduct = idCategoryProduct;
        this.emailUpdate = emailUpdate;
        this.dateUpdate = LocalDateTime.now();
    }
}
