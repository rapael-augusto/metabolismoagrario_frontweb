import React, { useEffect, useState } from 'react';

const AlertBox: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const mensagem = sessionStorage.getItem('mensagem');
        if (mensagem) {
            setMessage(JSON.parse(mensagem).mensagem);
            setIsVisible(true);

            sessionStorage.removeItem('mensagem');

            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, []);

    return (
        isVisible && (
            <div className="alert-box">
                <p>{message}</p>
            </div>
        )
    );
};

export default AlertBox;
