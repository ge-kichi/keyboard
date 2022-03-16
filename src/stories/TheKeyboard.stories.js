import TheKeyboard from "../components/TheKeyboard";

export default {
  component: TheKeyboard,
  title: "TheKeyboard",
};

const Template = (args) => <TheKeyboard {...args} />;
export const Default = Template.bind({});
Default.args = {
  useSampler: () => undefined,
};
