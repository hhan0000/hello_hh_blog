import React from "react";

const Paragraph = ({
  content,
  delimiter = "@", // 默认分隔符
  wrapper: Wrapper = "div", // 默认容器标签
  segmentElement: Segment = "p", // 默认段落标签
}) => {
  const segments = content.split(delimiter).filter((s) => s.trim());
  return (
    <Wrapper className="lg:text-lg flex-1 flex flex-col gap-6 text-justify">
      {segments.map((text, index) => (
        <Segment key={index} className={`segment-${index}`}>
          {text.trim()}
        </Segment>
      ))}
    </Wrapper>
  );
};

export default Paragraph;
