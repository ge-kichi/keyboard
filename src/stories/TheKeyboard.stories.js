import TheKeyboard from "../components/TheKeyboard";

export default {
  component: TheKeyboard,
  title: "TheKeyboard",
};

const Template = (args) => <TheKeyboard {...args} />;
export const Default = Template.bind({});
Default.args = {
  useSynth: () => undefined,
  useToneState: () => "stopped",
};
export const NotAllowed = Template.bind({});
NotAllowed.args = {
  useSynth: () => undefined,
  useToneState: () => "started",
};
