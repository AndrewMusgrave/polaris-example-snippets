// TODO: IMPORTANT - Use readme fixtures in tests rather than polaris
// Polaris can change and break tests
const { main } = require("../main");
const fs = require("fs");
const path = require("path");

jest.mock("fs", () => ({
  ...require.requireActual("fs"),
  readdirSync: () => [],
  writeFileSync: () => {}
}));

jest.mock("child_process", () => ({
  ...require.requireActual("child_process"),
  execSync: () => {}
}));

describe("main", () => {
  let writeFileSyncSpy;
  let readdirSyncSpy;

  beforeEach(() => {
    writeFileSyncSpy = jest.spyOn(fs, "writeFileSync");
    readdirSyncSpy = jest.spyOn(fs, "readdirSync");
  });

  afterEach(() => {
    writeFileSyncSpy.mockRestore();
    readdirSyncSpy.mockRestore();
  });

  it("generates a snippet from a example containing markup only", () => {
    readdirSyncSpy.mockImplementation(() => ["Badge"]);
    main();
    expect(fs.writeFileSync).toBeCalledWith(
      "./snippets/snippets.json",
      JSON.stringify(
        {
          DefaultBadge: {
            prefix: ["PEDefaultBadge", "PolarisExampleDefaultBadge"],
            body:
              "import React from 'react';\nimport {Badge} from '../src';\n\nexport function Playground() {\n  return (\n    <Badge>Fulfilled</Badge>\n  );\n}",
            description:
              "Use to give a non-critical status update on a piece of information or action."
          },
          InformationalBadge: {
            prefix: [
              "PEInformationalBadge",
              "PolarisExampleInformationalBadge"
            ],
            body:
              "import React from 'react';\nimport {Badge} from '../src';\n\nexport function Playground() {\n  return (\n    <Badge status=\"info\">Published</Badge>\n  );\n}",
            description:
              "Use to call out an object or action as having an important attribute. For example, marking an option as “Recommended” or marking a theme as “Published”."
          },
          SuccessBadge: {
            prefix: ["PESuccessBadge", "PolarisExampleSuccessBadge"],
            body:
              "import React from 'react';\nimport {Badge} from '../src';\n\nexport function Playground() {\n  return (\n    <Badge status=\"success\">Funds recovered</Badge>\n  );\n}",
            description:
              "Use to indicate a successful, completed, or desirable state when it’s important to provide positive reinforcement to merchants. For example, when merchants successfully dispute a chargeback, a success badge shows that says “Funds recovered”."
          },
          AttentionBadge: {
            prefix: ["PEAttentionBadge", "PolarisExampleAttentionBadge"],
            body:
              "import React from 'react';\nimport {Badge} from '../src';\n\nexport function Playground() {\n  return (\n    <Badge status=\"attention\">Unfulfilled</Badge>\n  );\n}",
            description:
              "Use when something requires merchants’ attention but the issue isn’t critical. For example, this badge would show next to an order that needs to be reviewed by merchants."
          },
          WarningBadge: {
            prefix: ["PEWarningBadge", "PolarisExampleWarningBadge"],
            body:
              "import React from 'react';\nimport {Badge} from '../src';\n\nexport function Playground() {\n  return (\n    <Badge status=\"warning\">SSL unavailable</Badge>\n  );\n}",
            description:
              "Use for critical and time-sensitive issues that require merchants’ attention and potential action. Warning events are often reversible.\n\nKeep in mind that seeing this badge can feel stressful for merchants so it should only be used when absolutely necessary."
          },
          CriticalBadge: {
            prefix: ["PECriticalBadge", "PolarisExampleCriticalBadge"],
            body:
              "import React from 'react';\nimport {Badge} from '../src';\n\nexport function Playground() {\n  return (\n    <Badge progress=\"incomplete\">Unfulfilled</Badge>\n  );\n}",
            description:
              "<!-- example-for: android, ios -->\n\nUse for critical and irreversible issues that require merchants’ attention and potential action.\n\nKeep in mind that seeing this badge can feel stressful for merchants so it should only be used when absolutely necessary.\n\n<!-- content-for: android -->\n\n![Critical badge with red background](/public_images/components/Badge/android/critical@2x.png)\n\n<!-- /content-for -->\n\n<!-- content-for: ios -->\n\n![Critical badge with red background](/public_images/components/Badge/ios/critical@2x.png)\n\n<!-- /content-for -->\n\n### Incomplete badge\n\nUse to indicate when a given task has not yet been completed. For example, when merchants haven’t fulfilled an order."
          },
          PartiallyCompleteBadge: {
            prefix: [
              "PEPartiallyCompleteBadge",
              "PolarisExamplePartiallyCompleteBadge"
            ],
            body:
              "import React from 'react';\nimport {Badge} from '../src';\n\nexport function Playground() {\n  return (\n    <Badge progress=\"partiallyComplete\">Partially fulfilled</Badge>\n  );\n}",
            description:
              "Use to indicate when a given task has been partially completed. For example, when merchants have partially fulfilled an order."
          },
          CompleteBadge: {
            prefix: ["PECompleteBadge", "PolarisExampleCompleteBadge"],
            body:
              "import React from 'react';\nimport {Badge} from '../src';\n\nexport function Playground() {\n  return (\n    <Badge progress=\"complete\">Fulfilled</Badge>\n  );\n}",
            description:
              "Use to indicate when a given task has been completed. For example, when merchants have fulfilled an order."
          }
        },
        null,
        2
      )
    );
  });

  it("generates a snippet from a example containing compound components", () => {
    readdirSyncSpy.mockImplementation(() => ["List"]);
    main();
    expect(fs.writeFileSync).toBeCalledWith(
      "./snippets/snippets.json",
      JSON.stringify(
        {
          BulletedList: {
            prefix: ["PEBulletedList", "PolarisExampleBulletedList"],
            body:
              "import React from 'react';\nimport {List} from '../src';\n\nexport function Playground() {\n  return (\n    <List type=\"bullet\">\n  <List.Item>Yellow shirt</List.Item>\n  <List.Item>Red shirt</List.Item>\n  <List.Item>Green shirt</List.Item>\n</List>\n  );\n}",
            description:
              "Use for a text-only list of related items that don’t need to be in a specific order and don’t require an icon or other indicator."
          },
          NumberedList: {
            prefix: ["PENumberedList", "PolarisExampleNumberedList"],
            body:
              "import React from 'react';\nimport {List} from '../src';\n\nexport function Playground() {\n  return (\n    <List type=\"number\">\n  <List.Item>First item</List.Item>\n  <List.Item>Second item</List.Item>\n  <List.Item>Third Item</List.Item>\n</List>\n  );\n}",
            description:
              "Use for a text-only list of related items when an inherent order, priority, or sequence needs to be communicated."
          }
        },
        null,
        2
      )
    );
  });

  it("generates a snippet from a example containing `React.Fragment` without include react in the component imports", () => {
    readdirSyncSpy.mockImplementation(() => ["AutoComplete"]);
    main();
    expect(fs.writeFileSync).toBeCalledWith(
      "./snippets/snippets.json",
      JSON.stringify(
        {
          BasicAutocomplete: {
            prefix: ["PEBasicAutocomplete", "PolarisExampleBasicAutocomplete"],
            body:
              "import React, {useState, useCallback} from 'react';\nimport {Autocomplete, Icon} from '../src';\n\nexport function AutocompleteExample() {\n  const deselectedOptions = [\n    {value: 'rustic', label: 'Rustic'},\n    {value: 'antique', label: 'Antique'},\n    {value: 'vinyl', label: 'Vinyl'},\n    {value: 'vintage', label: 'Vintage'},\n    {value: 'refurbished', label: 'Refurbished'},\n  ];\n  const [selectedOptions, setSelectedOptions] = useState([]);\n  const [inputValue, setInputValue] = useState('');\n  const [options, setOptions] = useState(deselectedOptions);\n\n  const updateText = useCallback(\n    (value) => {\n      setInputValue(value);\n\n      if (value === '') {\n        setOptions(deselectedOptions);\n        return;\n      }\n\n      const filterRegex = new RegExp(value, 'i');\n      const resultOptions = deselectedOptions.filter((option) =>\n        option.label.match(filterRegex),\n      );\n      setOptions(resultOptions);\n    },\n    [deselectedOptions],\n  );\n\n  const updateSelection = useCallback((selected) => {\n    const selectedValue = selected.map((selectedItem) => {\n      const matchedOption = options.find((option) => {\n        return option.value.match(selectedItem);\n      });\n      return matchedOption && matchedOption.label;\n    });\n\n    setSelectedOptions(selected);\n    setInputValue(selectedValue);\n  }, []);\n\n  const textField = (\n    <Autocomplete.TextField\n      onChange={updateText}\n      label=\"Tags\"\n      value={inputValue}\n      prefix={<Icon source={SearchMinor} color=\"inkLighter\" />}\n      placeholder=\"Search\"\n    />\n  );\n\n  return (\n    <div style={{height: '225px'}}>\n      <Autocomplete\n        options={options}\n        selected={selectedOptions}\n        onSelect={updateSelection}\n        textField={textField}\n      />\n    </div>\n  );\n}",
            description:
              "Use to help merchants complete text input quickly from a list of options."
          },
          MultipleTagsAutocomplete: {
            prefix: [
              "PEMultipleTagsAutocomplete",
              "PolarisExampleMultipleTagsAutocomplete"
            ],
            body:
              "import React, {useState, useCallback} from 'react';\nimport {Tag, Autocomplete, TextContainer, Stack} from '../src';\n\nexport function MultiAutocompleteExample() {\n  const deselectedOptions = [\n    {value: 'rustic', label: 'Rustic'},\n    {value: 'antique', label: 'Antique'},\n    {value: 'vinyl', label: 'Vinyl'},\n    {value: 'vintage', label: 'Vintage'},\n    {value: 'refurbished', label: 'Refurbished'},\n  ];\n  const [selectedOptions, setSelectedOptions] = useState([]);\n  const [inputValue, setInputValue] = useState('');\n  const [options, setOptions] = useState(deselectedOptions);\n\n  const updateText = useCallback(\n    (value) => {\n      setInputValue(value);\n\n      if (value === '') {\n        setOptions(deselectedOptions);\n        return;\n      }\n\n      const filterRegex = new RegExp(value, 'i');\n      const resultOptions = deselectedOptions.filter((option) =>\n        option.label.match(filterRegex),\n      );\n      let endIndex = resultOptions.length - 1;\n      if (resultOptions.length === 0) {\n        endIndex = 0;\n      }\n      setOptions(resultOptions);\n    },\n    [deselectedOptions],\n  );\n\n  const removeTag = useCallback(\n    (tag) => () => {\n      const options = [...selectedOptions];\n      options.splice(options.indexOf(tag), 1);\n      setSelectedOptions(options);\n    },\n    [selectedOptions],\n  );\n\n  const tagsMarkup = selectedOptions.map((option) => {\n    let tagLabel = '';\n    tagLabel = option.replace('_', ' ');\n    tagLabel = titleCase(tagLabel);\n    return (\n      <Tag key={`option${option}`} onRemove={removeTag(option)}>\n        {tagLabel}\n      </Tag>\n    );\n  });\n\n  const textField = (\n    <Autocomplete.TextField\n      onChange={updateText}\n      label=\"Tags\"\n      value={inputValue}\n      placeholder=\"Vintage, cotton, summer\"\n    />\n  );\n\n  return (\n    <div style={{height: '325px'}}>\n      <TextContainer>\n        <Stack>{tagsMarkup}</Stack>\n      </TextContainer>\n      <br />\n      <Autocomplete\n        allowMultiple\n        options={options}\n        selected={selectedOptions}\n        textField={textField}\n        onSelect={setSelectedOptions}\n        listTitle=\"Suggested Tags\"\n      />\n    </div>\n  );\n\n  function titleCase(string) {\n    return string\n      .toLowerCase()\n      .split(' ')\n      .map(function(word) {\n        return word.replace(word[0], word[0].toUpperCase());\n      })\n      .join('');\n  }\n}",
            description:
              "Use to help merchants select multiple options from a list curated by the text input."
          },
          AutocompleteWithLoading: {
            prefix: [
              "PEAutocompleteWithLoading",
              "PolarisExampleAutocompleteWithLoading"
            ],
            body:
              "import React, {useState, useCallback} from 'react';\nimport {Autocomplete, Icon} from '../src';\n\nexport function AutocompleteExample() {\n  const deselectedOptions = [\n    {value: 'rustic', label: 'Rustic'},\n    {value: 'antique', label: 'Antique'},\n    {value: 'vinyl', label: 'Vinyl'},\n    {value: 'vintage', label: 'Vintage'},\n    {value: 'refurbished', label: 'Refurbished'},\n  ];\n  const [selectedOptions, setSelectedOptions] = useState([]);\n  const [inputValue, setInputValue] = useState('');\n  const [options, setOptions] = useState(deselectedOptions);\n  const [loading, setLoading] = useState(false);\n\n  const updateText = useCallback(\n    (value) => {\n      setInputValue(value);\n\n      if (!loading) {\n        setLoading(true);\n      }\n\n      setTimeout(() => {\n        if (value === '') {\n          setOptions(deselectedOptions);\n          setLoading(true);\n          return;\n        }\n        const filterRegex = new RegExp(value, 'i');\n        const resultOptions = options.filter((option) =>\n          option.label.match(filterRegex),\n        );\n        setOptions(resultOptions);\n        setLoading(false);\n      }, 300);\n    },\n    [deselectedOptions],\n  );\n\n  const updateSelection = useCallback((selected) => {\n    const selectedText = selected.map((selectedItem) => {\n      const matchedOption = options.find((option) => {\n        return option.value.match(selectedItem);\n      });\n      return matchedOption && matchedOption.label;\n    });\n    setSelectedOptions(selected);\n    setInputValue(selectedText);\n  }, []);\n\n  const textField = (\n    <Autocomplete.TextField\n      onChange={updateText}\n      label=\"Tags\"\n      value={inputValue}\n      prefix={<Icon source={SearchMinor} color=\"inkLighter\" />}\n      placeholder=\"Search\"\n    />\n  );\n\n  return (\n    <div style={{height: '225px'}}>\n      <Autocomplete\n        options={options}\n        selected={selectedOptions}\n        onSelect={updateSelection}\n        loading={loading}\n        textField={textField}\n      />\n    </div>\n  );\n}",
            description:
              "Use to indicate loading state to merchants while option data is processing."
          },
          AutocompleteWithLazyLoading: {
            prefix: [
              "PEAutocompleteWithLazyLoading",
              "PolarisExampleAutocompleteWithLazyLoading"
            ],
            body:
              "import React, {useState, useCallback} from 'react';\nimport {Autocomplete, Tag, Stack} from '../src';\n\nexport function AutoCompleteLazyLoadExample() {\n  const paginationInterval = 25;\n  const deselectedOptions = Array.from(Array(100)).map((_, index) => ({\n    value: `rustic ${index}`,\n    label: `Rustic ${index}`,\n  }));\n\n  const [selectedOptions, setSelectedOptions] = useState([]);\n  const [inputValue, setInputValue] = useState('');\n  const [options, setOptions] = useState(deselectedOptions);\n  const [visibleOptionIndex, setVisibleOptionIndex] = useState(\n    paginationInterval,\n  );\n\n  const handleLoadMoreResults = useCallback(() => {\n    const nextVisibleOptionIndex = visibleOptionIndex + paginationInterval;\n    if (nextVisibleOptionIndex <= options.length - 1) {\n      setVisibleOptionIndex(nextVisibleOptionIndex);\n    }\n  }, [visibleOptionIndex]);\n\n  const removeTag = useCallback(\n    (tag) => () => {\n      const options = [...selectedOptions];\n      options.splice(options.indexOf(tag), 1);\n      setSelectedOptions(options);\n    },\n    [selectedOptions],\n  );\n\n  const updateText = useCallback(\n    (value) => {\n      setInputValue(value);\n\n      if (value === '') {\n        setOptions(deselectedOptions);\n        return;\n      }\n\n      const filterRegex = new RegExp(value, 'i');\n      const resultOptions = options.filter((option) =>\n        option.label.match(filterRegex),\n      );\n\n      let endIndex = resultOptions.length - 1;\n      if (resultOptions.length === 0) {\n        endIndex = 0;\n      }\n      setOptions(resultOptions);\n    },\n    [deselectedOptions],\n  );\n\n  const textField = (\n    <Autocomplete.TextField\n      onChange={updateText}\n      label=\"Tags\"\n      value={inputValue}\n      placeholder=\"Vintage, cotton, summer\"\n    />\n  );\n\n  const hasSelectedOptions = selectedOptions.length > 0;\n\n  const tagsMarkup = hasSelectedOptions\n    ? selectedOptions.map((option) => {\n        let tagLabel = '';\n        tagLabel = option.replace('_', ' ');\n        tagLabel = titleCase(tagLabel);\n        return (\n          <Tag key={`option${option}`} onRemove={removeTag(option)}>\n            {tagLabel}\n          </Tag>\n        );\n      })\n    : null;\n  const optionList = options.slice(0, visibleOptionIndex);\n  const selectedTagMarkup = hasSelectedOptions ? (\n    <Stack spacing=\"extraTight\">{tagsMarkup}</Stack>\n  ) : null;\n\n  return (\n    <Stack vertical>\n      {selectedTagMarkup}\n      <Autocomplete\n        allowMultiple\n        options={optionList}\n        selected={selectedOptions}\n        textField={textField}\n        onSelect={setSelectedOptions}\n        listTitle=\"Suggested Tags\"\n        onLoadMoreResults={handleLoadMoreResults}\n      />\n    </Stack>\n  );\n\n  function titleCase(string) {\n    return string\n      .toLowerCase()\n      .split(' ')\n      .map((word) => {\n        return word.replace(word[0], word[0].toUpperCase());\n      })\n      .join(' ');\n  }\n}",
            description: ""
          },
          AutocompleteWithEmptyState: {
            prefix: [
              "PEAutocompleteWithEmptyState",
              "PolarisExampleAutocompleteWithEmptyState"
            ],
            body:
              "import React, {useState, useCallback} from 'react';\nimport {Autocomplete, Icon, TextContainer} from '../src';\n\nexport function AutocompleteExample() {\n  const deselectedOptions = [\n    {value: 'rustic', label: 'Rustic'},\n    {value: 'antique', label: 'Antique'},\n    {value: 'vinyl', label: 'Vinyl'},\n    {value: 'vintage', label: 'Vintage'},\n    {value: 'refurbished', label: 'Refurbished'},\n  ];\n  const [selectedOptions, setSelectedOptions] = useState([]);\n  const [inputValue, setInputValue] = useState('');\n  const [options, setOptions] = useState(deselectedOptions);\n  const [loading, setLoading] = useState(false);\n\n  const updateText = useCallback(\n    (value) => {\n      setInputValue(value);\n\n      if (!loading) {\n        setLoading(true);\n      }\n\n      setTimeout(() => {\n        if (value === '') {\n          setOptions(deselectedOptions);\n          setLoading(false);\n          return;\n        }\n        const filterRegex = new RegExp(value, 'i');\n        const resultOptions = options.filter((option) =>\n          option.label.match(filterRegex),\n        );\n        setOptions(resultOptions);\n        setLoading(false);\n      }, 300);\n    },\n    [deselectedOptions, loading, options],\n  );\n\n  const updateSelection = useCallback(\n    (selected) => {\n      const selectedText = selected.map((selectedItem) => {\n        const matchedOption = options.find((option) => {\n          return option.value.match(selectedItem);\n        });\n        return matchedOption && matchedOption.label;\n      });\n      setSelectedOptions(selected);\n      setInputValue(selectedText);\n    },\n    [options],\n  );\n\n  const textField = (\n    <Autocomplete.TextField\n      onChange={updateText}\n      label=\"Tags\"\n      value={inputValue}\n      prefix={<Icon source={SearchMinor} color=\"inkLighter\" />}\n      placeholder=\"Search\"\n    />\n  );\n\n  const emptyState = (\n    <React.Fragment>\n      <Icon source={SearchMinor} />\n      <div style={{textAlign: 'center'}}>\n        <TextContainer>Could not find any results</TextContainer>\n      </div>\n    </React.Fragment>\n  );\n\n  return (\n    <div style={{height: '225px'}}>\n      <Autocomplete\n        options={options}\n        selected={selectedOptions}\n        onSelect={updateSelection}\n        emptyState={emptyState}\n        loading={loading}\n        textField={textField}\n      />\n    </div>\n  );\n}",
            description: "Use to indicate there are no search results."
          }
        },
        null,
        2
      )
    );
  });

  it("generates a snippet from a function example", () => {
    readdirSyncSpy.mockImplementation(() => ["Form"]);
    main();
    expect(fs.writeFileSync).toBeCalledWith(
      "./snippets/snippets.json",
      JSON.stringify(
        {
          CustomOnSubmit: {
            prefix: ["PECustomOnSubmit", "PolarisExampleCustomOnSubmit"],
            body:
              "import React, {useState, useCallback} from 'react';\nimport {Form, FormLayout, Checkbox, TextField, Button} from '../src';\n\nexport function FormOnSubmitExample() {\n  const [newsletter, setNewsletter] = useState(false);\n  const [email, setEmail] = useState('');\n\n  const handleSubmit = useCallback((_event) => {\n    setEmail('');\n    setNewsletter(false);\n  }, []);\n\n  const handleNewsLetterChange = useCallback(\n    (value) => setNewsletter(value),\n    [],\n  );\n\n  const handleEmailChange = useCallback((value) => setEmail(value), []);\n\n  return (\n    <Form onSubmit={handleSubmit}>\n      <FormLayout>\n        <Checkbox\n          label=\"Sign up for the Polaris newsletter\"\n          checked={newsletter}\n          onChange={handleNewsLetterChange}\n        />\n\n        <TextField\n          value={email}\n          onChange={handleEmailChange}\n          label=\"Email\"\n          type=\"email\"\n          helpText={\n            <span>\n              We’ll use this email address to inform you on future changes to\n              Polaris.\n            </span>\n          }\n        />\n\n        <Button submit>Submit</Button>\n      </FormLayout>\n    </Form>\n  );\n}",
            description:
              "Use onSubmit as a callback for when your form is submitted."
          },
          FormWithoutNativeValidation: {
            prefix: [
              "PEFormWithoutNativeValidation",
              "PolarisExampleFormWithoutNativeValidation"
            ],
            body:
              "import React, {useState, useCallback} from 'react';\nimport {Form, FormLayout, TextField, Button} from '../src';\n\nexport function FormWithoutNativeValidationExample() {\n  const [url, setUrl] = useState('');\n\n  const handleSubmit = useCallback((_event) => setUrl(''), []);\n\n  const handleUrlChange = useCallback((value) => setUrl(value), []);\n\n  return (\n    <Form noValidate onSubmit={handleSubmit}>\n      <FormLayout>\n        <TextField\n          value={url}\n          onChange={handleUrlChange}\n          label=\"App URL\"\n          type=\"url\"\n        />\n\n        <Button submit>Submit</Button>\n      </FormLayout>\n    </Form>\n  );\n}",
            description: "Use in forms to toggle native form validation."
          }
        },
        null,
        2
      )
    );
  });

  it.todo(
    "generates a snippet from a example container `Fragment` and includes it in the react scope rather than component"
  );

  // Needs more regex
  it.todo("generates a snippet from a class example");

  // Other examples already using react apis, let create a complex one
  it.todo("generates a snippet from a example using react apis");

  // Other examples already do this, lets create a complex example?
  it.todo("generates a snippet from a example using polaris components");
});
