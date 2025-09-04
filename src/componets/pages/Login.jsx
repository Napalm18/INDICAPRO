import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Target, Mail, Lock, Eye, EyeOff, UserPlus, LogIn } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    }

    if (!isLogin) {
      if (!formData.fullName) {
        newErrors.fullName = "Nome completo é obrigatório";
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Confirmação de senha é obrigatória";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Senhas não coincidem";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock successful login/signup
      console.log(isLogin ? "Login" : "Cadastro", "bem-sucedido:", formData);

      // Navigate to dashboard
      navigate("/dashboard");

    } catch (error) {
      console.error("Erro:", error);
      setErrors({ general: "Erro ao processar solicitação. Tente novamente." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-tr from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-yellow-500/20 animate-pulse">
            <Target className="w-10 h-10 text-black" />
          </div>
          <h1 className="text-3xl font-bold text-yellow-400 mb-2 tracking-wider">INDICAPRO</h1>
          <p className="text-yellow-300">Sistema Premium de Indicações</p>
        </div>

        {/* Login/Signup Card */}
        <Card className="bg-gradient-to-br from-black to-gray-900 border-yellow-600 shadow-2xl shadow-yellow-500/10">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-yellow-400 mb-2">
              {isLogin ? "Entrar" : "Cadastrar"}
            </CardTitle>
            <p className="text-yellow-300 text-sm">
              {isLogin
                ? "Acesse sua conta para continuar"
                : "Crie sua conta para começar"
              }
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* General Error */}
              {errors.general && (
                <div className="bg-red-900/20 border border-red-600 text-red-400 px-4 py-3 rounded-lg text-sm">
                  {errors.general}
                </div>
              )}

              {/* Full Name (only for signup) */}
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-yellow-300">
                    Nome Completo
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="bg-gray-800 border-yellow-600 text-yellow-400 placeholder-yellow-400/50 focus:border-yellow-500 focus:ring-yellow-500"
                    placeholder="Digite seu nome completo"
                  />
                  {errors.fullName && (
                    <p className="text-red-400 text-sm">{errors.fullName}</p>
                  )}
                </div>
              )}

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-yellow-300">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-yellow-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 bg-gray-800 border-yellow-600 text-yellow-400 placeholder-yellow-400/50 focus:border-yellow-500 focus:ring-yellow-500"
                    placeholder="Digite seu email"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-sm">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-yellow-300">
                  Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-yellow-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 bg-gray-800 border-yellow-600 text-yellow-400 placeholder-yellow-400/50 focus:border-yellow-500 focus:ring-yellow-500"
                    placeholder="Digite sua senha"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-yellow-400 hover:text-yellow-300"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-sm">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password (only for signup) */}
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-yellow-300">
                    Confirmar Senha
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-yellow-400" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="pl-10 bg-gray-800 border-yellow-600 text-yellow-400 placeholder-yellow-400/50 focus:border-yellow-500 focus:ring-yellow-500"
                      placeholder="Confirme sua senha"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-sm">{errors.confirmPassword}</p>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold py-3 rounded-lg shadow-lg shadow-yellow-500/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                    Processando...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    {isLogin ? <LogIn className="w-5 h-5 mr-2" /> : <UserPlus className="w-5 h-5 mr-2" />}
                    {isLogin ? "Entrar" : "Cadastrar"}
                  </div>
                )}
              </Button>

              {/* Toggle Login/Signup */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setErrors({});
                    setFormData({
                      email: "",
                      password: "",
                      confirmPassword: "",
                      fullName: ""
                    });
                  }}
                  className="text-yellow-300 hover:text-yellow-400 text-sm underline transition-colors"
                >
                  {isLogin
                    ? "Não tem uma conta? Cadastre-se"
                    : "Já tem uma conta? Faça login"
                  }
                </button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-yellow-400/60 text-sm">
            © 2024 IndicaPro. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}
