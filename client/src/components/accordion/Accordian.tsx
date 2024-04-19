import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const Collapsible = styled.div`
  margin-bottom: 5px;
  position: relative;

  .toggle {
    background: #fff;
    width: 100%;
    text-align: left;
    border: unset;
    font: unset;

    padding: 1rem 2rem;
    border-radius: 7px 7px 0 0;
    background: #ffffff;
    font-size: 2.2rem;
    color: #1c1d3e;
    text-transform: capitalize;
    display: inline-block;
    width: 100%;
    letter-spacing: normal;
    cursor: pointer;
    ::before,
    ::after {
      content: '';
      display: block;
      position: absolute;
      top: 15px;
      width: 0;
      border-right: 2px solid #888;
      height: 20px;
      transform: rotate(0deg);
      right: 20px;
      margin-top: 0;
      transition: all 0.35s ease-out;
      pointer-events: none;
    }
    ::after {
      transform: rotate(90deg);
      top: 15px;
    }

    &.active,
    :hover {
      background: linear-gradient(#1ca346, #6fba1a);
      color: #ffffff;
      ::before,
      ::after {
        border-right: 2px solid #fff;
      }
    }

    &.active {
      ::before {
        top: 20px;
        margin-top: 0;
        right: 20px;
        transform: rotate(135deg);
      }
      ::after {
        top: 20px;
        margin-top: 0;
        right: 20px;
        transform: rotate(45deg);
      }
    }
  }
  .content-parent {
    height: 0px;
    overflow: hidden;
    transition: height ease 0.3s;
  }
  .content {
    /* padding: 20px 40px 20px 20px; */
    padding: 1rem 4rem 1rem 2rem;
    font-size: 2.2rem !important;
    background-color: #fff;
    border-radius: 0 0 7px 7px;
    & p {
      margin: 0 !important;
      padding: 0 !important;
    }
  }
  @media only screen and (max-width: 600px) {
    .toggle {
      font-size: 2.2rem !important;
      padding-right: 4rem;
    }
    .content {
      padding: 0.5rem 2rem 0.5rem 1rem;
      font-size: 2rem !important;
    }
  }
`;

interface AccordianProps {
  label: string;
  children: any;
}
const Accordian = (props: AccordianProps) => {
  const { label, children } = props;
  const [isOpen, setIsOpen] = useState(false);
  const parentRef: React.RefObject<HTMLDivElement> = useRef();
  return (
    <Collapsible>
      <button
        type="button"
        className={isOpen ? 'toggle active' : 'toggle'}
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
      </button>
      <div
        className="content-parent"
        ref={parentRef}
        style={
          isOpen
            ? {
                height: parentRef.current.scrollHeight,
              }
            : {
                height: 0,
              }
        }
      >
        <div className="content">{children}</div>
      </div>
    </Collapsible>
  );
};

export default Accordian;
