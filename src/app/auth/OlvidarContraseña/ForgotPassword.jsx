"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useForgotPassword } from '../../hooks/auth/useForgotPassword';
import RequestCodeStep from './RequestCodeStep';
import VerifyCodeStep from './VerifyCodeStep';
import ResetPasswordStep from './ResetPasswordStep';

const ForgotPassword = () => {
  const router = useRouter();
  const { sendResetCode, verifyCode, resetPassword, isLoading } = useForgotPassword();
  
  const [step, setStep] = useState(1); // 1: Email, 2: Code, 3: Password
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  // Paso 1: Solicitar código
  const handleSendCode = async (emailValue) => {
    try {
      await sendResetCode(emailValue, {
        onSuccess: () => {
          toast.success('¡Código enviado! Revisa tu correo');
          setEmail(emailValue);
          setStep(2);
        },
        onError: (error) => {
          toast.error(error);
        }
      });
    } catch (error) {
      console.error('Error al enviar código:', error);
    }
  };

  // Paso 2: Verificar código
  const handleVerifyCode = async (codeValue) => {
    try {
      await verifyCode(email, codeValue, {
        onSuccess: () => {
          toast.success('Código verificado correctamente');
          setCode(codeValue);
          setStep(3);
        },
        onError: (error) => {
          toast.error(error);
        }
      });
    } catch (error) {
      console.error('Error al verificar código:', error);
    }
  };

  // Paso 3: Restablecer contraseña
  const handleResetPassword = async (passwordData) => {
    try {
      await resetPassword({
        email,
        code,
        newPassword: passwordData.newPassword,
        confirmPassword: passwordData.confirmPassword
      }, {
        onSuccess: () => {
          toast.success('¡Contraseña restablecida exitosamente!');
          setTimeout(() => {
            router.push('/pages/login');
          }, 2000);
        },
        onError: (error) => {
          toast.error(error);
        }
      });
    } catch (error) {
      console.error('Error al restablecer contraseña:', error);
    }
  };

  // Reenviar código
  const handleResendCode = async () => {
    try {
      await sendResetCode(email, {
        onSuccess: () => {
          toast.success('Código reenviado exitosamente');
        },
        onError: (error) => {
          toast.error(error);
        }
      });
    } catch (error) {
      console.error('Error al reenviar código:', error);
    }
  };

  // Volver al paso anterior
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.push('/pages/login');
    }
  };

  return (
    <>
      {step === 1 && (
        <RequestCodeStep
          onNext={handleSendCode}
          onBack={() => router.push('/pages/login')}
          isLoading={isLoading}
          email={email}
          setEmail={setEmail}
        />
      )}
      
      {step === 2 && (
        <VerifyCodeStep
          onNext={handleVerifyCode}
          onBack={handleBack}
          onResend={handleResendCode}
          isLoading={isLoading}
          email={email}
        />
      )}
      
      {step === 3 && (
        <ResetPasswordStep
          onNext={handleResetPassword}
          isLoading={isLoading}
          email={email}
          code={code}
        />
      )}
    </>
  );
};

export default ForgotPassword;