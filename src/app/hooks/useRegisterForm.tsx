import { useState, useEffect } from "react";
import Auth from "@/services/auth";
import { useRouter } from "next/navigation";

const useRegisterForm = () => {
    const auth = new Auth();
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [respostaRequisicao, setResposta] = useState<string>('');
    const [session, setSession] = useState<string | null>('');

    const handleRoleChange = (value: string) => {
        setRole(value);
    };

    const options = [
        { value: "ADMIN", label: "Administrador" },
        { value: "OPERATOR", label: "Operador" },
    ];

    useEffect(() => {
        const token = sessionStorage.getItem('@token');

        if (!token) {
            sessionStorage.setItem('mensagem', `{"mensagem":"Você não possui permissões para acessar essa pagina !","tipo":"danger"}`);
            router.push('/');
        } else {
            setSession(token);
        }
    }, [router]);

    const cadastroEvento = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name) {
            sessionStorage.setItem('mensagem', `{"mensagem":"Nome é um campo obrigatório para cadastrar um usuário !","tipo":"danger"}`);
            location.reload();
        } else if (!email) {
            sessionStorage.setItem('mensagem', `{"mensagem":"E-mail é um campo obrigatório para cadastrar um usuário !","tipo":"danger"}`);
            location.reload();
        } else if (!role) {
            sessionStorage.setItem('mensagem', `{"mensagem":"Tipo de usuário é um campo obrigatório para cadastrar um usuário !","tipo":"danger"}`);
            location.reload();
        } else if (!password) {
            sessionStorage.setItem('mensagem', `{"mensagem":"Senha é um campo obrigatório para cadastrar um usuário !","tipo":"danger"}`);
            location.reload();
        } else {
            const dadosCadastro = {
                name: name,
                email: email,
                role: role,
                password: password,
            };

            try {
                const response: any = await auth.cadastro(dadosCadastro, session);
                const { status, message } = response;

                if (message === "User already exists") {
                    sessionStorage.setItem('mensagem', `{"mensagem":"Esse E-mail não está disponível","tipo":"danger"}`);
                    location.reload();
                }
                else {
                    sessionStorage.setItem('mensagem', `{"mensagem":"Usuário cadastrado com sucesso !","tipo":"success"}`);
                    router.push('/usersList');
                    setResposta(status);

                }

            } catch (error) {
                console.error("Erro ao cadastrar usuário:", error);
                sessionStorage.setItem('mensagem', `{"mensagem":"Erro ao cadastrar usuário","tipo":"danger"}`);
                location.reload();
            }
        }
    };

    useEffect(() => {
        if (respostaRequisicao === "1") {
            sessionStorage.setItem('mensagem', `{"mensagem":"Usuário cadastrado com sucesso !","tipo":"success"}`);
            router.push('/usersList');
        }
    }, [respostaRequisicao, router]);

    return {
        name,
        setName,
        email,
        setEmail,
        role,
        setRole,
        password,
        setPassword,
        handleRoleChange,
        options,
        cadastroEvento,
    };
};

export default useRegisterForm;
