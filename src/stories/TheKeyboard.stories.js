import TheKeyboard from "../components/TheKeyboard";

export default {
  component: TheKeyboard,
  title: "TheKeyboard",
};

const Template = (args) => <TheKeyboard {...args} />;
export const Default = Template.bind({});
Default.args = {
  useKeyboard: function () {
    const _pressKey = (e) =>
      e.target.classList.add("the-keyboard__key--pressing");

    const _releaseKey = (e) =>
      e.target.classList.remove("the-keyboard__key--pressing");

    return {
      pressKey: (e) => {
        _pressKey(e);
        const currentTarget = e.currentTarget;
        currentTarget.addEventListener("pointerover", _pressKey);
        currentTarget.addEventListener("pointerout", _releaseKey);
      },
      releaseKey: (e) => {
        _releaseKey(e);
        const currentTarget = e.currentTarget;
        currentTarget.removeEventListener("pointerover", _pressKey);
        currentTarget.removeEventListener("pointerout", _releaseKey);
      },
    };
  },
};
