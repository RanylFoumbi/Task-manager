/// <reference types="vite/client" />

import React from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "el-disclosure": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        hidden?: boolean;
        id?: string;
      };
      "el-dropdown": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "el-menu": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        anchor?: string;
        popover?: boolean;
      };
    }
  }
}
