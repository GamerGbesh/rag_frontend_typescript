import React, {MouseEvent, Dispatch, SetStateAction} from "react";
import {Course, DetailData, HomeData, LibraryInfo , LibraryData, Member, Document} from "./DataTypes";


export interface DeleteButtonProps {
    message?: string
    onShowPopup: Dispatch<SetStateAction<boolean>>
}

export interface SidebarProps {
    data: DetailData | LibraryData | HomeData;
    activeFunction?: (library: LibraryInfo | Course | Member | number) => Promise<void> | void;
    disabled?: boolean
}

export interface SideCardProps {
    item: LibraryInfo | Course| Member;
    index?: number;
    activeFunction: (library: LibraryInfo | Course | Member | number) => Promise<void> | void;
    active?: number | null;
    setActive?: Dispatch<SetStateAction<number | null>>;
}

export interface MemberCardProps {
    content: Member;
    makeFunction: (user_id: number) => void;
    creator: boolean;
    removeFunction: (user_id: number) => void;
    deleteFunction: (user_id: number) => void;
}

export interface ConfirmPopupProps {
    text?: string;
    onClick: (e: MouseEvent<HTMLButtonElement>) => Promise<void>;
}


export interface DashboardProps {
    data: HomeData
    activeFunction: (library: LibraryInfo) => void;
    disabled: boolean
}


export interface AddContentProps {
    course_id: number
    library_id: number
    activeFunction: (course_id: number, start?:boolean) => Promise<void>;
}

export interface AddCourseProps {
    id: number
    addFunction: () => void
}

export interface AutoResizingTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>{
    placeholder?: string;
    minRows?: number;
    maxRows?: number;
    handleClick: (query: string, start? :boolean) => void;
}

export interface ContentCardProps {
    content: Document;
    makeFunction: (doc_id: number) => void
    deleteFunction: (id: number) => void
    permission: boolean;
}

export interface LibraryCardProps {
    library: LibraryInfo
    onClick: () => void;
}

export interface MessageProps {
    response: string;
    user: boolean;
}

export interface PaginationProps {
    currentQuestion: number;
    totalQuestions: number;
    onQuestionChange: (question: number) => void;
    setChosen: Dispatch<SetStateAction<boolean>>;
}

export interface PopupProps {
    onSubmit?: (question: number) => void;
    correct?: number
    count?: number
    library_id?: number
    setShowPopup?: Dispatch<SetStateAction<number | null>>
}

export interface QuestionsProps {
    question: string,
    answers: string[],
    explanation: string,
    currentQuestion: number,
    totalQuestions: number,
    onQuestionChange: (question: number) => void,
    correctAnswer: number,
    correct: number,
    setCorrect: Dispatch<SetStateAction<number>>,
    answered: number,
    setAnswered: Dispatch<SetStateAction<number>>,
}