/**
 * 教學內容相關型別定義
 */

export type Language = "typescript" | "java" | "springboot" | "kotlin";

export type CourseCategory =
  | "basics"
  | "oop"
  | "collections"
  | "advanced"
  | "springboot"
  | "kotlin";

export interface CodeExample {
  language: Language;
  code: string;
  filename?: string;
  explanation: string;
  highlights?: string[];
}

export interface ComparisonItem {
  title: string;
  typescript: CodeExample;
  java: CodeExample;
  springboot?: CodeExample;
  kotlin?: CodeExample;
  keyDifferences: string[];
  similarities?: string[];
}

export interface TutorialSection {
  id: string;
  title: string;
  description: string;
  content: string;
  examples: CodeExample[];
  comparisons?: ComparisonItem[];
  order: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: CourseCategory;
  icon: string;
  difficulty: number;
  estimatedTime: number;
  sections: TutorialSection[];
  tags: string[];
}

export interface NavItem {
  id: string;
  label: string;
  path?: string;
  icon?: string;
  children?: NavItem[];
}
