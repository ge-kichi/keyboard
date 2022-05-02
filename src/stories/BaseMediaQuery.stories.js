import BaseMediaQuery from "../components/BaseMediaQuery";

export default {
  component: BaseMediaQuery,
  title: "BaseMediaQuery",
};

const Template = (args) => <BaseMediaQuery {...args} />;

export const Default = Template.bind({});
Default.args = {
  mqComponents: {
    "(max-width: 599px)": <div>media query: Extra Small</div>,
    "(min-width: 600px)": <div>media query: Small</div>,
  },
};

const _BreakPoint = () => (
  <div>
    <BaseMediaQuery
      mqComponents={{
        "(max-width: 599px)": <div>media query: Extra Small</div>,
        "(min-width: 600px)": <div>media query: Small</div>,
        "(min-width: 960px)": <div>media query: Medium</div>,
        "(min-width: 1280px)": <div>media query: Large</div>,
        "(min-width: 1920px)": <div>media query: Extra Large</div>,
      }}
    />
  </div>
);
export const BreakPoint = _BreakPoint.bind({});
