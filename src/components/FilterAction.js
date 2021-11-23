
import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

export default function FilterAction(props) {

    const rowGutter  = { xs: 8, sm: 8, md: 8, lg: 8 };
    const { config } = props;
  
    //const { RangePicker } = DatePicker;
  
    /**
     * generate element based on settings
     * @param setting: settings for building element
     * @return JSX.Element
     */
    const getElement = (setting) => {
      switch (setting.type) {
        case "input": {
          let properties = {
            placeholder: "..."
          };
  
          if (setting.placeholder) properties.placeholder = setting.placeholder;

          return (
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>{setting.name}</Form.Label>
              <Form.Control 
                type="text"
                name={setting.name}
                {...properties} 
                onChange={(event) =>
                    props.triggerAction({
                    config: setting,
                    action: setting.name,
                    event: event
                    })
              }/>
            </Form.Group>
          );
        }
  
        case "button": {
          let properties = {
            class: "",
            text: "Button",
            icon:"",
          };
  
          if (setting.text) properties.text = setting.text;
  
          if (setting.class) properties.class = setting.class;
          if (setting.icon) properties.icon = setting.icon;
  
          return (
            <Button
              className={properties.class}
              block
              onClick={(event) =>
                props.triggerAction({ config: setting, action: setting.name })
              }
              icon={properties.icon}
            >
              {properties.text}
            </Button>
          );
        }
        default:
          break;
      }
    };
  
    return (
      <div className={"mr-2 ml-2 mb-2"}>
        <Row gutter={rowGutter}>
          {config &&
            config.map((setting, index) => (
              <Col
                className="gutter-row mt-3 mt-lg-0"
                key={index}
                xs={{ span: setting.columnSize.xs || 6 }}
                sm={{ span: setting.columnSize.sm || 6 }}
                md={{ span: setting.columnSize.md || 6 }}
                lg={{ span: setting.columnSize.lg || 6 }}
              >
                <div>{getElement(setting)}</div>
              </Col>
            ))}
        </Row>
      </div>
    );
  }
  