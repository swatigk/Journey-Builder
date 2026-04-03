import type { ActionBlueprintGraphResponse } from '../../types'

export const graphFixture: ActionBlueprintGraphResponse = {
  id: 'bp_01jk766tckfwx84xjcxazggzyc',
  name: 'Onboard Customer 0',
  description: 'Automated test action',
  nodes: [
    {
      id: 'form-bad163fd-09bd-4710-ad80-245f31b797d5',
      type: 'form',
      data: {
        component_id: 'f_01jk7ap2r3ewf9gx6a9r09gzjv',
        component_key: 'form-bad163fd-09bd-4710-ad80-245f31b797d5',
        name: 'Form F',
        prerequisites: [
          'form-0f58384c-4966-4ce6-9ec2-40b96d61f745',
          'form-e15d42df-c7c0-4819-9391-53730e6d47b3',
        ],
        input_mapping: {},
      },
    },
    {
      id: 'form-0f58384c-4966-4ce6-9ec2-40b96d61f745',
      type: 'form',
      data: {
        component_id: 'f_01jk7ap2r3ewf9gx6a9r09gzjv',
        component_key: 'form-0f58384c-4966-4ce6-9ec2-40b96d61f745',
        name: 'Form D',
        prerequisites: ['form-a4750667-d774-40fb-9b0a-44f8539ff6c4'],
        input_mapping: {},
      },
    },
    {
      id: 'form-47c61d17-62b0-4c42-8ca2-0eff641c9d88',
      type: 'form',
      data: {
        component_id: 'f_01jk7ap2r3ewf9gx6a9r09gzjv',
        component_key: 'form-47c61d17-62b0-4c42-8ca2-0eff641c9d88',
        name: 'Form A',
        prerequisites: [],
        input_mapping: {},
      },
    },
    {
      id: 'form-7c26f280-7bff-40e3-b9a5-0533136f52c3',
      type: 'form',
      data: {
        component_id: 'f_01jk7aygnqewh8gt8549beb1yc',
        component_key: 'form-7c26f280-7bff-40e3-b9a5-0533136f52c3',
        name: 'Form C',
        prerequisites: ['form-47c61d17-62b0-4c42-8ca2-0eff641c9d88'],
        input_mapping: {},
      },
    },
    {
      id: 'form-a4750667-d774-40fb-9b0a-44f8539ff6c4',
      type: 'form',
      data: {
        component_id: 'f_01jk7awbhqewgbkbgk8rjm7bv7',
        component_key: 'form-a4750667-d774-40fb-9b0a-44f8539ff6c4',
        name: 'Form B',
        prerequisites: ['form-47c61d17-62b0-4c42-8ca2-0eff641c9d88'],
        input_mapping: {},
      },
    },
    {
      id: 'form-e15d42df-c7c0-4819-9391-53730e6d47b3',
      type: 'form',
      data: {
        component_id: 'f_01jk7ap2r3ewf9gx6a9r09gzjv',
        component_key: 'form-e15d42df-c7c0-4819-9391-53730e6d47b3',
        name: 'Form E',
        prerequisites: ['form-7c26f280-7bff-40e3-b9a5-0533136f52c3'],
        input_mapping: {},
      },
    },
  ],
  edges: [],
  forms: [
    {
      id: 'f_01jk7ap2r3ewf9gx6a9r09gzjv',
      name: 'test form',
      description: 'test',
      field_schema: {
        type: 'object',
        required: ['id', 'name', 'email'],
        properties: {
          dynamic_checkbox_group: {
            title: 'Dynamic Checkbox Group',
            type: 'array',
          },
          dynamic_object: {
            title: 'Dynamic Object',
            type: 'object',
          },
          email: {
            title: 'Email',
            type: 'string',
            format: 'email',
          },
          id: {
            title: 'ID',
            type: 'string',
          },
          multi_select: {
            title: 'Multi Select',
            type: 'array',
          },
          name: {
            title: 'Name',
            type: 'string',
          },
          notes: {
            title: 'Notes',
            type: 'string',
          },
        },
      },
    },
    {
      id: 'f_01jk7awbhqewgbkbgk8rjm7bv7',
      name: 'test form',
      description: 'test',
      field_schema: {
        type: 'object',
        required: ['id', 'name', 'email'],
        properties: {
          dynamic_checkbox_group: {
            title: 'Dynamic Checkbox Group',
            type: 'array',
          },
          dynamic_object: {
            title: 'Dynamic Object',
            type: 'object',
          },
          email: {
            title: 'Email',
            type: 'string',
            format: 'email',
          },
          id: {
            title: 'ID',
            type: 'string',
          },
          multi_select: {
            title: 'Multi Select',
            type: 'array',
          },
          name: {
            title: 'Name',
            type: 'string',
          },
          notes: {
            title: 'Notes',
            type: 'string',
          },
        },
      },
    },
    {
      id: 'f_01jk7aygnqewh8gt8549beb1yc',
      name: 'test form',
      description: 'test',
      field_schema: {
        type: 'object',
        required: ['id', 'name', 'email'],
        properties: {
          dynamic_checkbox_group: {
            title: 'Dynamic Checkbox Group',
            type: 'array',
          },
          dynamic_object: {
            title: 'Dynamic Object',
            type: 'object',
          },
          email: {
            title: 'Email',
            type: 'string',
            format: 'email',
          },
          id: {
            title: 'ID',
            type: 'string',
          },
          multi_select: {
            title: 'Multi Select',
            type: 'array',
          },
          name: {
            title: 'Name',
            type: 'string',
          },
          notes: {
            title: 'Notes',
            type: 'string',
          },
        },
      },
    },
  ],
}
