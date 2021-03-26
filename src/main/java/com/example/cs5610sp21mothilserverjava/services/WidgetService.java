package com.example.cs5610sp21mothilserverjava.services;

import com.example.cs5610sp21mothilserverjava.models.Widget;
import com.example.cs5610sp21mothilserverjava.repositories.WidgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WidgetService {

    @Autowired
    WidgetRepository repository;

    public Widget createWidget(String topicId, Widget widget) {
        widget.setTopicId(topicId);
        return repository.save(widget);
    }

    public List<Widget> findWidgetsForTopic(String topicId) {
        return repository.findWidgetsForTopic(topicId);
    }

    public int updateWidget(Integer widgetId, Widget widget) {
        widget.setId(widgetId);
        repository.save(widget);
        return 0;
    }

    public int deleteWidget(Integer widgetId) {
        repository.deleteById(widgetId);
        return 0;
    }

    public List<Widget> findAllWidgets() {
        return (List<Widget>) repository.findAll();
    }

    public Widget findWidgetById(Integer widgetId) {
        return repository.findById(widgetId).orElse(null);
    }
}
