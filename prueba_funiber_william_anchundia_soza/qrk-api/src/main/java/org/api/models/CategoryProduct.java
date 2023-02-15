package org.api.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "categoryproduct")
public class CategoryProduct {

    @Id
    @Column(name = "id_category_product")
    private Integer idCategoryProduct;

    @Column(name = "name_category_product")
    private String nameCategoryProduct;

    public Integer getIdCategoryProduct() {
        return idCategoryProduct;
    }

    public void setIdCategoriaProduct(Integer idCategoryProduct) {
        this.idCategoryProduct = idCategoryProduct;
    }

    public String getNameCategoryProduct() {
        return nameCategoryProduct;
    }

    public void setNameCategoryProduct(String nameCategoryProduct) {
        this.nameCategoryProduct = nameCategoryProduct;
    }

    public CategoryProduct() {
    }

    public CategoryProduct(Integer idCategoryProduct, String nameCategoryProduct) {
        this.idCategoryProduct = idCategoryProduct;
        this.nameCategoryProduct = nameCategoryProduct;
    }


}
