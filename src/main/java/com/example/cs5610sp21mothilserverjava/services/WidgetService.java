package com.example.cs5610sp21mothilserverjava.services;

import com.example.cs5610sp21mothilserverjava.models.Widget;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class WidgetService {

    private final List<Widget> widgets = new ArrayList<>();
    {
        Widget w1 = new Widget(UUID.randomUUID().getMostSignificantBits() & Long.MAX_VALUE, "ABC123", "HEADING", 1, "Welcome to Widgets");
        Widget w2 = new Widget(UUID.randomUUID().getMostSignificantBits() & Long.MAX_VALUE, "ABC234", "PARAGRAPH", 1, "This is a paragraph");
        Widget w3 = new Widget(UUID.randomUUID().getMostSignificantBits() & Long.MAX_VALUE, "ABC234", "HEADING", 2, "Welcome to WebDev");
        Widget w4 = new Widget(UUID.randomUUID().getMostSignificantBits() & Long.MAX_VALUE, "ABC234", "PARAGRAPH", 1, "Lorem ipsum");
        widgets.add(w1);
        widgets.add(w2);
        widgets.add(w3);
        widgets.add(w4);
    }

    public Widget createWidget(String topicId, Widget widget) {
        long widgetId = UUID.randomUUID().getMostSignificantBits() & Long.MAX_VALUE;
        widget.setId(widgetId);
        widget.setTopicId(topicId);
        widgets.add(widget);

        return widget;
    }

    public List<Widget> findWidgetsForTopic(String topicId) {
        List<Widget> widgetsForTopic = new ArrayList<>();
        for (Widget widget : widgets) {
            if (widget.getTopicId().equals(topicId)) {
                widgetsForTopic.add(widget);
            }
        }

        return widgetsForTopic;
    }

    public int updateWidget(long widgetId, Widget newWidget) {
        for (int i = 0; i < widgets.size(); i++) {
            if (widgets.get(i).getId() == widgetId) {
                widgets.set(i, newWidget);
                return 0;
            }
        }

        return -1;
    }

    public int deleteWidget(long widgetId) {
        int removeIndex = -1;
        for (int i = 0; i < widgets.size(); i++) {
            if (widgets.get(i).getId() == widgetId) {
                removeIndex = i;
                break;
            }
        }

        if (removeIndex >= 0) {
            widgets.remove(removeIndex);
            return 0;
        }

        return -1;
    }

    public List<Widget> findAllWidgets() {
        return widgets;
    }

    public Widget findWidgetById(long widgetId) {
        for (Widget widget : widgets) {
            if (widget.getId() == widgetId) {
                return widget;
            }
        }

        return null;
    }
}
