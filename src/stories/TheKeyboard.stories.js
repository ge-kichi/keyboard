import TheKeyboard from "../components/TheKeyboard";

export default {
  component: TheKeyboard,
  title: "TheKeyboard",
};

const Template = (args) => <TheKeyboard {...args} />;
export const Default = Template.bind({});
Default.args = {
  useKeyboard: () => {
    return {
      synth: undefined,
      toneState: "stopped",
    };
  },
};
export const NotAllowed = Template.bind({});
NotAllowed.args = {
  useKeyboard: () => {
    return {
      synth: undefined,
      toneState: "started",
    };
  },
};
