import {ReactNode} from "react";
import * as React from "react";

export interface TreeNode {
  checkable?: boolean;
  children?: TreeNode[];
  disabled?: boolean;
  disableCheckbox?: boolean;
  isLeaf?: boolean;
  key: string | number;
  title: ReactNode;
  selectable?: boolean;
  style?: React.CSSProperties;
}
