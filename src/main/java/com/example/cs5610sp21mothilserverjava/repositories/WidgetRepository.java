package com.example.cs5610sp21mothilserverjava.repositories;

import com.example.cs5610sp21mothilserverjava.models.Widget;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WidgetRepository extends CrudRepository<Widget, Integer> {

    @Query(value = "SELECT * FROM widget WHERE topic_id=:tid", nativeQuery = true)
    List<Widget> findWidgetsForTopic(@Param("tid") String topicId);
}
