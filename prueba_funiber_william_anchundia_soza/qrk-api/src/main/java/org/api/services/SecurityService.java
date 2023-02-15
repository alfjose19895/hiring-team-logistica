package org.api.services;

import org.api.models.Person;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;

@ApplicationScoped
public class SecurityService {
    private EntityManager em;

    final Logger log = LoggerFactory.getLogger(this.getClass());

    public SecurityService(EntityManager em) {
        this.em = em;
    }

    public List<Person> getAll(){
        return em.createQuery("Select a from Person a", Person.class).getResultList();
    }

    public Person getPersonaForId(Integer id){
        Person person = new Person();
        try{
            person = em.createQuery("select a from Person a where a.id = :id " , Person.class)
                    .setParameter("id",id)
                    .getSingleResult();
        }catch (Exception e){
            log.error("getPersonaForId: {}", e.getMessage());
        }
        return person;
    }

    public Person getPersonaForEmailPassword(String email, String password){
        Person person = new Person();
        try{
            person = em.createQuery("select a from Person a where a.email = :email and a.password = :password" , Person.class)
                    .setParameter("email",email)
                    .setParameter("password",password)
                    .getSingleResult();
        }catch (Exception e){
            log.error("getPersonaForNamePassword: {}", e.getMessage());
        }
        return person;
    }

    @Transactional
    public void create(Person person){
        em.persist(person);
    }

    @Transactional
    public void update(Person person){
        em.merge(person);
    }

    @Transactional
    public void delete(Person person){
        em.remove(em.contains(person) ? person : em.merge(person));
    }
}
