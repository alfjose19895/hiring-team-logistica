package org.api.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "product")
public class Product {
    @Id
    @Column(name = "id_product")
    private Integer idProduct;

    @Column(name = "code_product")
    private String codeProduct;

    @Column(name = "name_product")
    private String nameProduct;

    @Column(name = "id_category_product")
    private Integer idCategoryProduct;

    @Column(name = "has_stock")
    private Integer hasStock;

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

    public Integer getHasStock() {
        return hasStock;
    }

    public void setHasStock(Integer hasStock) {
        this.hasStock = hasStock;
    }

    public Product() {
    }

    public Product(Integer idProduct, String codeProduct, String nameProduct, Integer idCategoryProduct, Integer hasStock) {
        this.idProduct = idProduct;
        this.codeProduct = codeProduct;
        this.nameProduct = nameProduct;
        this.idCategoryProduct = idCategoryProduct;
        this.hasStock = hasStock;
    }
}
