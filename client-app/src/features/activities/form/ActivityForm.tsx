import React, { useState, FormEvent, useContext } from "react";
import { Segment, Form, FormInput, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../app/store/ActivityStore";
import { observer } from "mobx-react-lite";

interface IProps {
  activity: IActivity;
}

export const ActivityForm: React.FC<IProps> = observer(
  ({ activity: activityInitialFormState }) => {
    const activityStore = useContext(ActivityStore);
    const {
      createActivity,
      editActivity,
      submitting,
      cancelFormOpen,
    } = activityStore;

    const initializeForm = () => {
      if (activityInitialFormState) {
        return activityInitialFormState;
      } else {
        return {
          id: "",
          title: "",
          category: "",
          description: "",
          date: "",
          city: "",
          venue: "",
        };
      }
    };

    const [activity, setactivity] = useState<IActivity>(initializeForm);

    const handleSubmit = () => {
      if (activity.id.length === 0) {
        let newActivity = {
          ...activity,
          id: uuid(),
        };

        createActivity(newActivity);
      } else {
        editActivity(activity);
      }
    };

    console.log(activity.date);

    const handleInputChange = (
      event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = event.currentTarget;

      setactivity({ ...activity, [name]: value });
    };

    return (
      <Segment clearing>
        <Form onSubmit={handleSubmit}>
          <FormInput
            onChange={handleInputChange}
            name="title"
            placeholder="Title"
            value={activity.title}
          />
          <Form.TextArea
            onChange={handleInputChange}
            name="description"
            placeholder="Description"
            value={activity.description}
          />
          <FormInput
            onChange={handleInputChange}
            name="category"
            placeholder="Category"
            value={activity.category}
          />
          <FormInput
            onChange={handleInputChange}
            name="date"
            type="datetime-local"
            placeholder="Date"
            vallue={activity.date}
          />
          <FormInput
            onChange={handleInputChange}
            name="city"
            placeholder="City"
            value={activity.city}
          />
          <FormInput
            onChange={handleInputChange}
            name="venue"
            placeholder="Vanue"
            value={activity.venue}
          />
          <Button
            loading={submitting}
            floated="right"
            positive
            type="submit"
            content="Submit"
          />
          <Button
            onClick={() => cancelFormOpen}
            floated="right"
            type="submit"
            content="Cancel"
          />
        </Form>
      </Segment>
    );
  }
);
