/**
 * @author Lahiru Dilshan
 * @email lahirudilshan@orelit.com
 * @date 2021-06-11
 */

import {
  Button,
  Col,
  Input,
  Row,
  Select,
  Form,
  DatePicker,
  TreeSelect,
} from "antd";
import { property } from "lodash";
import { element } from "prop-types";

import React from "react";

export default function TableActionBar(props) {
  const rowGutter = { xs: 8, sm: 8, md: 8, lg: 8 };
  const { config } = props;

  const { RangePicker } = DatePicker;

  /**
   * generate element based on settings
   * @param setting: settings for building element
   * @return JSX.Element
   */
  const getElement = (setting) => {
    switch (setting.type) {
      case "input": {
        let properties = {
          placeholder: "...",
          prefix: "",
        };

        if (setting.placeholder) properties.placeholder = setting.placeholder;

        if (setting.prefix) properties.prefix = setting.prefix;

        return (
          <Form.Item name={setting.name}>
            <Input
              {...properties}
              onChange={(event) =>
                props.triggerAction({
                  config: setting,
                  action: setting.name,
                  event: event,
                })
              }
            />
          </Form.Item>
        );
      }
      case "select": {
        return (
          <Form.Item name={setting.name}>
            <Select
              allowClear={setting.allowClear}
              showSearch={setting.showSearch}
              optionFilterProp="children"
              allowClear={true}             
              className="w-100"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              placeholder={setting.placeholder}
              onChange={(event) =>
                props.triggerAction({
                  config: setting,
                  action: setting.name,
                  event: event,
                })
              }
            >
              {setting.options &&
                setting.options.map((option, index) => (
                  <Select.Option key={index} value={option.value}>
                    {option.text}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        );
      }

      case "tree":
        return (
          <Form.Item name={setting.name}>
            <TreeSelect
              showSearch
              treeDefaultExpandAll
              allowClear={true}
              treeData={setting?.options}
              placeholder="Please select"
              filterTreeNode={(search, item) => {
                return (
                  item.title.toLowerCase().indexOf(search.toLowerCase()) >= 0
                );
              }}
            />
          </Form.Item>
        );

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
      case "dateRange": {
        return (
          <Form.Item name={setting.name}>
            <RangePicker
              showTime={{ format: "YYYY-MM-DD HH:mm" }}
              format="YYYY-MM-DD HH:mm"
              onChange={(event) =>
                props.triggerAction({
                  config: setting,
                  action: setting.name,
                  event: event,
                })
              }
            />
          </Form.Item>
        );
      }
      default:
        break;
    }
  };

  // const setSectionField = (setting, index) => {
  //   if (setting.section == 'field') {
  //     return (
  //       <Col
  //         key={index}
  //         xs={{ span: setting?.columnSize?.xs || 6 }}
  //         sm={{ span: setting?.columnSize?.sm || 6 }}
  //         md={{ span: setting?.columnSize?.md || 6 }}
  //         lg={{ span: setting?.columnSize?.lg || 6 }}>
  //         {getElement(setting)}
  //       </Col>
  //     );
  //   } else {
  //     return <></>;
  //   }
  // };
  // const setSectionButton = (setting, index) => {
  //   if (setting.section == 'button') {
  //     return (
  //       <Col
  //         key={index}
  //         xs={{ span: setting?.columnSize?.xs || 6 }}
  //         sm={{ span: setting?.columnSize?.sm || 6 }}
  //         md={{ span: setting?.columnSize?.md || 6 }}
  //         lg={{ span: setting?.columnSize?.lg || 6 }}>
  //         <div>{getElement(setting)}</div>
  //       </Col>
  //     );
  //   } else {
  //     return <></>;
  //   }
  // };

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
