import ProjectInputField from "./ProjectInputField";
import ProjectTextArea from "./ProjectTextArea";

type Props = {
    title: string;
    problem: string;
    cause: string;
    solution: string;
    result: string;
    onChangeTitle: React.ChangeEventHandler<HTMLInputElement>;
    onChangeProblem: React.ChangeEventHandler<HTMLTextAreaElement>;
    onChangeCause: React.ChangeEventHandler<HTMLTextAreaElement>;
    onChangeSolution: React.ChangeEventHandler<HTMLTextAreaElement>;
    onChangeResult: React.ChangeEventHandler<HTMLTextAreaElement>;
};

export default function ProjectTroubleShooting ({ 
    title,
    problem,
    cause,
    solution,
    result,
    onChangeTitle,
    onChangeProblem,
    onChangeCause,
    onChangeSolution,
    onChangeResult,
 }: Props) {

    return (
        <div
            className="
                flex flex-col gap-5
                rounded-2xl
                border border-zinc-200
                bg-white
                p-5

                dark:border-zinc-700
                dark:bg-zinc-800/40">
            
            <ProjectInputField 
                label="트러블 슈팅 제목"
                name="title" type="text"
                value={title}
                onChange={onChangeTitle}
                placeholder="문제 제목을 입력해주세요."/>

            <div className="grid gap-5">
                <ProjectTextArea
                    label="문제"
                    name="problem"
                    value={problem}
                    onChange={onChangeProblem}
                    placeholder="어떤 문제가 발생했나요?"
                />

                <ProjectTextArea
                    label="원인"
                    name="cause"
                    value={cause}
                    onChange={onChangeCause}
                    placeholder="문제의 원인을 작성해주세요."
                />

                <ProjectTextArea
                    label="해결"
                    name="solution"
                    value={solution}
                    onChange={onChangeSolution}
                    placeholder="어떻게 해결했나요?"
                />

                <ProjectTextArea
                    label="결과"
                    name="result"
                    value={result}
                    onChange={onChangeResult}
                    placeholder="해결 후 어떤 결과가 있었나요?"
                />
            </div>
        </div>
    );
}