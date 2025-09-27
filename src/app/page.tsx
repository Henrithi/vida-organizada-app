"use client"

import { useState, useEffect } from 'react'
import { 
  Home, 
  DollarSign, 
  CheckSquare, 
  ShoppingCart, 
  User, 
  Plus,
  TrendingUp,
  Calendar,
  Target,
  FileText,
  Bell,
  Settings,
  CreditCard,
  PieChart,
  BarChart3,
  Clock,
  Star,
  Share2,
  Scan,
  AlertTriangle,
  ChefHat,
  Trash2,
  Edit,
  Filter,
  Search,
  Download,
  Trophy,
  Zap,
  Shield,
  Smartphone,
  Mail,
  Eye,
  EyeOff,
  X,
  Save,
  ArrowLeft,
  TrendingDown,
  Minus
} from 'lucide-react'

// Tipos de dados
interface Transaction {
  id: string
  type: 'income' | 'expense'
  amount: number
  category: string
  description: string
  date: string
}

interface Task {
  id: string
  title: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  dueDate: string
  category: string
  description?: string
}

interface ShoppingItem {
  id: string
  name: string
  quantity: number
  price: number
  category: string
  completed: boolean
  expiryDate?: string
}

interface Goal {
  id: string
  title: string
  target: number
  current: number
  category: string
}

interface User {
  name: string
  email: string
  xp: number
  level: number
  achievements: number
  isPremium: boolean
}

export default function VidaOrganizada() {
  const [currentScreen, setCurrentScreen] = useState('home')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'transaction' | 'task' | 'shopping' | 'goal' | null>(null)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [taskFilter, setTaskFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Estados dos dados com persistência local
  const [user, setUser] = useState<User>({
    name: 'João Silva',
    email: 'joao@email.com',
    xp: 1250,
    level: 5,
    achievements: 15,
    isPremium: true
  })

  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', type: 'income', amount: 3500, category: 'Salário', description: 'Salário mensal', date: '2024-01-01' },
    { id: '2', type: 'expense', amount: 1200, category: 'Moradia', description: 'Aluguel', date: '2024-01-02' },
    { id: '3', type: 'expense', amount: 300, category: 'Alimentação', description: 'Supermercado', date: '2024-01-03' },
    { id: '4', type: 'expense', amount: 150, category: 'Transporte', description: 'Combustível', date: '2024-01-04' },
    { id: '5', type: 'expense', amount: 80, category: 'Lazer', description: 'Cinema', date: '2024-01-05' },
  ])

  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Pagar conta de luz', completed: false, priority: 'high', dueDate: '2024-01-15', category: 'Financeiro', description: 'Conta vence hoje' },
    { id: '2', title: 'Reunião com cliente', completed: false, priority: 'medium', dueDate: '2024-01-10', category: 'Trabalho', description: 'Apresentar proposta' },
    { id: '3', title: 'Exercitar-se', completed: true, priority: 'low', dueDate: '2024-01-08', category: 'Saúde', description: 'Academia 1h' },
    { id: '4', title: 'Comprar presente aniversário', completed: false, priority: 'medium', dueDate: '2024-01-20', category: 'Pessoal', description: 'Aniversário da Maria' },
  ])

  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([
    { id: '1', name: 'Leite', quantity: 2, price: 4.50, category: 'Laticínios', completed: false, expiryDate: '2024-01-20' },
    { id: '2', name: 'Pão', quantity: 1, price: 3.00, category: 'Padaria', completed: false, expiryDate: '2024-01-12' },
    { id: '3', name: 'Maçã', quantity: 6, price: 8.00, category: 'Frutas', completed: true, expiryDate: '2024-01-25' },
    { id: '4', name: 'Arroz', quantity: 1, price: 12.00, category: 'Grãos', completed: false },
    { id: '5', name: 'Feijão', quantity: 1, price: 8.50, category: 'Grãos', completed: false },
  ])

  const [goals, setGoals] = useState<Goal[]>([
    { id: '1', title: 'Reserva de Emergência', target: 10000, current: 3500, category: 'Poupança' },
    { id: '2', title: 'Viagem de Férias', target: 5000, current: 1200, category: 'Lazer' },
    { id: '3', title: 'Carro Novo', target: 25000, current: 8500, category: 'Transporte' },
  ])

  const [preferences, setPreferences] = useState({
    notifications: true,
    darkMode: false,
    autoSync: true,
    cloudBackup: true
  })

  // Persistência local
  useEffect(() => {
    const savedData = localStorage.getItem('vidaOrganizada')
    if (savedData) {
      const data = JSON.parse(savedData)
      setTransactions(data.transactions || transactions)
      setTasks(data.tasks || tasks)
      setShoppingItems(data.shoppingItems || shoppingItems)
      setGoals(data.goals || goals)
      setUser(data.user || user)
      setPreferences(data.preferences || preferences)
    }
  }, [])

  useEffect(() => {
    const dataToSave = {
      transactions,
      tasks,
      shoppingItems,
      goals,
      user,
      preferences
    }
    localStorage.setItem('vidaOrganizada', JSON.stringify(dataToSave))
  }, [transactions, tasks, shoppingItems, goals, user, preferences])

  // Cálculos
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
  const balance = totalIncome - totalExpenses
  const completedTasks = tasks.filter(t => t.completed).length
  const totalTasks = tasks.length
  const taskProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0
  const shoppingTotal = shoppingItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const completedShopping = shoppingItems.filter(item => item.completed).length

  // Funções utilitárias
  const generateId = () => Date.now().toString()
  
  const addXP = (points: number) => {
    const newXP = user.xp + points
    const newLevel = Math.floor(newXP / 250) + 1
    setUser(prev => ({ ...prev, xp: newXP, level: newLevel }))
  }

  const getExpiringItems = () => {
    const today = new Date()
    const threeDaysFromNow = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000)
    return shoppingItems.filter(item => {
      if (!item.expiryDate) return false
      const expiryDate = new Date(item.expiryDate)
      return expiryDate <= threeDaysFromNow && !item.completed
    })
  }

  const getExpensesByCategory = () => {
    const expenses = transactions.filter(t => t.type === 'expense')
    const categories: { [key: string]: number } = {}
    expenses.forEach(expense => {
      categories[expense.category] = (categories[expense.category] || 0) + expense.amount
    })
    return Object.entries(categories).map(([category, amount]) => ({ category, amount }))
  }

  const getFilteredTasks = () => {
    let filtered = tasks
    
    if (taskFilter === 'pending') {
      filtered = filtered.filter(task => !task.completed)
    } else if (taskFilter === 'completed') {
      filtered = filtered.filter(task => task.completed)
    }
    
    if (searchTerm) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    return filtered.sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    })
  }

  // Formulários e Modais
  const FormModal = () => {
    const [formData, setFormData] = useState<any>({})

    useEffect(() => {
      if (editingItem) {
        setFormData(editingItem)
      } else {
        setFormData({})
      }
    }, [editingItem])

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      
      if (modalType === 'transaction') {
        const transaction: Transaction = {
          id: editingItem?.id || generateId(),
          type: formData.type || 'expense',
          amount: parseFloat(formData.amount) || 0,
          category: formData.category || '',
          description: formData.description || '',
          date: formData.date || new Date().toISOString().split('T')[0]
        }
        
        if (editingItem) {
          setTransactions(prev => prev.map(t => t.id === editingItem.id ? transaction : t))
        } else {
          setTransactions(prev => [...prev, transaction])
          addXP(10)
        }
      }
      
      else if (modalType === 'task') {
        const task: Task = {
          id: editingItem?.id || generateId(),
          title: formData.title || '',
          completed: formData.completed || false,
          priority: formData.priority || 'medium',
          dueDate: formData.dueDate || new Date().toISOString().split('T')[0],
          category: formData.category || '',
          description: formData.description || ''
        }
        
        if (editingItem) {
          setTasks(prev => prev.map(t => t.id === editingItem.id ? task : t))
        } else {
          setTasks(prev => [...prev, task])
          addXP(5)
        }
      }
      
      else if (modalType === 'shopping') {
        const item: ShoppingItem = {
          id: editingItem?.id || generateId(),
          name: formData.name || '',
          quantity: parseInt(formData.quantity) || 1,
          price: parseFloat(formData.price) || 0,
          category: formData.category || '',
          completed: formData.completed || false,
          expiryDate: formData.expiryDate || undefined
        }
        
        if (editingItem) {
          setShoppingItems(prev => prev.map(i => i.id === editingItem.id ? item : i))
        } else {
          setShoppingItems(prev => [...prev, item])
          addXP(3)
        }
      }
      
      else if (modalType === 'goal') {
        const goal: Goal = {
          id: editingItem?.id || generateId(),
          title: formData.title || '',
          target: parseFloat(formData.target) || 0,
          current: parseFloat(formData.current) || 0,
          category: formData.category || ''
        }
        
        if (editingItem) {
          setGoals(prev => prev.map(g => g.id === editingItem.id ? goal : g))
        } else {
          setGoals(prev => [...prev, goal])
          addXP(15)
        }
      }
      
      setShowModal(false)
      setEditingItem(null)
      setModalType(null)
    }

    if (!showModal || !modalType) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              {editingItem ? 'Editar' : 'Adicionar'} {
                modalType === 'transaction' ? 'Transação' :
                modalType === 'task' ? 'Tarefa' :
                modalType === 'shopping' ? 'Item' :
                modalType === 'goal' ? 'Meta' : ''
              }
            </h2>
            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-xl">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {modalType === 'transaction' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
                  <select
                    value={formData.type || 'expense'}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="expense">Despesa</option>
                    <option value="income">Receita</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Valor</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.amount || ''}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                    placeholder="0,00"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                  <select
                    value={formData.category || ''}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Selecione uma categoria</option>
                    <option value="Alimentação">Alimentação</option>
                    <option value="Moradia">Moradia</option>
                    <option value="Transporte">Transporte</option>
                    <option value="Saúde">Saúde</option>
                    <option value="Lazer">Lazer</option>
                    <option value="Educação">Educação</option>
                    <option value="Salário">Salário</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Investimentos">Investimentos</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                  <input
                    type="text"
                    value={formData.description || ''}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                    placeholder="Descrição da transação"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data</label>
                  <input
                    type="date"
                    value={formData.date || new Date().toISOString().split('T')[0]}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </>
            )}

            {modalType === 'task' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500"
                    placeholder="Nome da tarefa"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                  <select
                    value={formData.category || ''}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500"
                    required
                  >
                    <option value="">Selecione uma categoria</option>
                    <option value="Trabalho">Trabalho</option>
                    <option value="Pessoal">Pessoal</option>
                    <option value="Financeiro">Financeiro</option>
                    <option value="Saúde">Saúde</option>
                    <option value="Casa">Casa</option>
                    <option value="Estudos">Estudos</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prioridade</label>
                  <select
                    value={formData.priority || 'medium'}
                    onChange={(e) => setFormData({...formData, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="low">Baixa</option>
                    <option value="medium">Média</option>
                    <option value="high">Alta</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data de Vencimento</label>
                  <input
                    type="date"
                    value={formData.dueDate || new Date().toISOString().split('T')[0]}
                    onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500"
                    placeholder="Detalhes da tarefa"
                    rows={3}
                  />
                </div>
              </>
            )}

            {modalType === 'shopping' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Item</label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500"
                    placeholder="Nome do produto"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quantidade</label>
                    <input
                      type="number"
                      min="1"
                      value={formData.quantity || ''}
                      onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500"
                      placeholder="1"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preço</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price || ''}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500"
                      placeholder="0,00"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                  <select
                    value={formData.category || ''}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500"
                    required
                  >
                    <option value="">Selecione uma categoria</option>
                    <option value="Frutas">Frutas</option>
                    <option value="Verduras">Verduras</option>
                    <option value="Laticínios">Laticínios</option>
                    <option value="Carnes">Carnes</option>
                    <option value="Grãos">Grãos</option>
                    <option value="Padaria">Padaria</option>
                    <option value="Limpeza">Limpeza</option>
                    <option value="Higiene">Higiene</option>
                    <option value="Bebidas">Bebidas</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data de Validade (opcional)</label>
                  <input
                    type="date"
                    value={formData.expiryDate || ''}
                    onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
              </>
            )}

            {modalType === 'goal' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Título da Meta</label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                    placeholder="Nome da meta"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                  <select
                    value={formData.category || ''}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                    required
                  >
                    <option value="">Selecione uma categoria</option>
                    <option value="Poupança">Poupança</option>
                    <option value="Investimentos">Investimentos</option>
                    <option value="Lazer">Lazer</option>
                    <option value="Transporte">Transporte</option>
                    <option value="Casa">Casa</option>
                    <option value="Educação">Educação</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Valor Alvo</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.target || ''}
                    onChange={(e) => setFormData({...formData, target: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                    placeholder="0,00"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Valor Atual</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.current || ''}
                    onChange={(e) => setFormData({...formData, current: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                    placeholder="0,00"
                    required
                  />
                </div>
              </>
            )}

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl hover:from-emerald-600 hover:to-blue-600"
              >
                {editingItem ? 'Salvar' : 'Adicionar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  // Tela de Login
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Vida Organizada</h1>
            <p className="text-gray-600">Organize sua vida financeira, tarefas e compras</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="seu@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <button
              onClick={() => {
                if (loginForm.email && loginForm.password) {
                  setIsLoggedIn(true)
                  addXP(20)
                }
              }}
              className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              Entrar
            </button>
            <div className="text-center">
              <a href="#" className="text-emerald-600 text-sm hover:underline">Esqueceu sua senha?</a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Componente de Navegação
  const Navigation = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {[
          { id: 'home', icon: Home, label: 'Home', color: 'text-emerald-500' },
          { id: 'finances', icon: DollarSign, label: 'Finanças', color: 'text-blue-500' },
          { id: 'tasks', icon: CheckSquare, label: 'Tarefas', color: 'text-orange-500' },
          { id: 'shopping', icon: ShoppingCart, label: 'Compras', color: 'text-yellow-600' },
          { id: 'profile', icon: User, label: 'Perfil', color: 'text-purple-500' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentScreen(item.id)}
            className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 ${
              currentScreen === item.id 
                ? `${item.color} bg-gray-50 scale-110` 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs mt-1 font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )

  // Tela Home
  const HomeScreen = () => (
    <div className="pb-20 bg-gradient-to-br from-emerald-50 to-blue-50 min-h-screen">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Olá, {user.name.split(' ')[0]}! 👋</h1>
            <p className="text-gray-600">Como está sua vida hoje?</p>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 bg-white rounded-xl shadow-sm relative">
              <Bell className="w-5 h-5 text-gray-600" />
              {getExpiringItems().length > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              )}
            </button>
            <button className="p-2 bg-white rounded-xl shadow-sm">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Alertas */}
        {getExpiringItems().length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <h4 className="font-semibold text-red-800">Itens vencendo!</h4>
            </div>
            <p className="text-red-700 text-sm">
              {getExpiringItems().length} item(ns) da sua lista de compras vencem em breve.
            </p>
          </div>
        )}

        {/* Cards de Resumo */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8 text-emerald-500" />
              <span className={`text-xs px-2 py-1 rounded-full ${
                balance >= 0 ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
              }`}>
                {balance >= 0 ? '+' : ''}{((balance / totalIncome) * 100).toFixed(0)}%
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-800">R$ {balance.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Saldo Atual</p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <CheckSquare className="w-8 h-8 text-orange-500" />
              <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">{Math.round(taskProgress)}%</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{completedTasks}/{totalTasks}</p>
            <p className="text-sm text-gray-600">Tarefas</p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <ShoppingCart className="w-8 h-8 text-yellow-600" />
              <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full">{shoppingItems.length}</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">R$ {shoppingTotal.toFixed(2)}</p>
            <p className="text-sm text-gray-600">Lista de Compras</p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Trophy className="w-8 h-8 text-purple-500" />
              <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">Nível {user.level}</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{user.xp.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Pontos XP</p>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Ações Rápidas</h3>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => {
                setModalType('transaction')
                setEditingItem(null)
                setShowModal(true)
              }}
              className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors"
            >
              <Plus className="w-5 h-5 text-emerald-600" />
              <span className="text-emerald-700 font-medium">Nova Receita</span>
            </button>
            <button 
              onClick={() => {
                setModalType('task')
                setEditingItem(null)
                setShowModal(true)
              }}
              className="flex items-center space-x-3 p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
            >
              <Plus className="w-5 h-5 text-blue-600" />
              <span className="text-blue-700 font-medium">Nova Tarefa</span>
            </button>
            <button 
              onClick={() => alert('Funcionalidade de scanner em desenvolvimento!')}
              className="flex items-center space-x-3 p-3 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors"
            >
              <Scan className="w-5 h-5 text-orange-600" />
              <span className="text-orange-700 font-medium">Escanear</span>
            </button>
            <button 
              onClick={() => {
                setModalType('shopping')
                setEditingItem(null)
                setShowModal(true)
              }}
              className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-xl hover:bg-yellow-100 transition-colors"
            >
              <Plus className="w-5 h-5 text-yellow-600" />
              <span className="text-yellow-700 font-medium">Add Compra</span>
            </button>
          </div>
        </div>

        {/* Metas em Progresso */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Metas em Progresso</h3>
            <button 
              onClick={() => {
                setModalType('goal')
                setEditingItem(null)
                setShowModal(true)
              }}
              className="p-1 text-emerald-600 hover:bg-emerald-50 rounded-lg"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          {goals.map((goal) => (
            <div key={goal.id} className="mb-4 last:mb-0">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-800">{goal.title}</span>
                <span className="text-sm text-gray-600">
                  R$ {goal.current.toLocaleString()} / R$ {goal.target.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // Tela de Finanças
  const FinancesScreen = () => {
    const expensesByCategory = getExpensesByCategory()
    const colors = ['bg-blue-500', 'bg-emerald-500', 'bg-orange-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500']

    return (
      <div className="pb-20 bg-gradient-to-br from-blue-50 to-emerald-50 min-h-screen">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Finanças</h1>
            <button 
              onClick={() => {
                setModalType('transaction')
                setEditingItem(null)
                setShowModal(true)
              }}
              className="p-2 bg-white rounded-xl shadow-sm"
            >
              <Plus className="w-5 h-5 text-blue-600" />
            </button>
          </div>

          {/* Saldo Principal */}
          <div className="bg-gradient-to-r from-blue-500 to-emerald-500 rounded-2xl p-6 text-white mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-blue-100">Saldo Total</p>
                <p className="text-3xl font-bold">R$ {balance.toLocaleString()}</p>
              </div>
              <CreditCard className="w-12 h-12 text-blue-200" />
            </div>
            <div className="flex justify-between text-sm">
              <div>
                <p className="text-blue-200">Receitas</p>
                <p className="font-semibold">R$ {totalIncome.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-blue-200">Despesas</p>
                <p className="font-semibold">R$ {totalExpenses.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Gráfico de Gastos */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Gastos por Categoria</h3>
              <PieChart className="w-5 h-5 text-gray-600" />
            </div>
            <div className="space-y-3">
              {expensesByCategory.map((item, index) => (
                <div key={item.category} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${colors[index % colors.length]}`}></div>
                    <span className="text-gray-700">{item.category}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-gray-800">
                      R$ {item.amount.toLocaleString()}
                    </span>
                    <p className="text-xs text-gray-500">
                      {((item.amount / totalExpenses) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transações Recentes */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Transações Recentes</h3>
              <button className="text-blue-600 text-sm font-medium">Ver todas</button>
            </div>
            <div className="space-y-3">
              {transactions.slice(-5).reverse().map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      transaction.type === 'income' ? 'bg-emerald-100' : 'bg-red-100'
                    }`}>
                      {transaction.type === 'income' ? 
                        <TrendingUp className="w-5 h-5 text-emerald-600" /> : 
                        <TrendingDown className="w-5 h-5 text-red-600" />
                      }
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{transaction.description}</p>
                      <p className="text-sm text-gray-600">{transaction.category} • {transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.type === 'income' ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}R$ {transaction.amount.toLocaleString()}
                    </p>
                    <button 
                      onClick={() => {
                        setEditingItem(transaction)
                        setModalType('transaction')
                        setShowModal(true)
                      }}
                      className="text-xs text-gray-500 hover:text-blue-600"
                    >
                      Editar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Metas Financeiras */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Metas Financeiras</h3>
              <Target className="w-5 h-5 text-emerald-500" />
            </div>
            {goals.map((goal) => (
              <div key={goal.id} className="mb-4 last:mb-0">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-800">{goal.title}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">
                      {Math.round((goal.current / goal.target) * 100)}%
                    </span>
                    <button 
                      onClick={() => {
                        setEditingItem(goal)
                        setModalType('goal')
                        setShowModal(true)
                      }}
                      className="text-gray-400 hover:text-blue-600"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-blue-500 h-3 rounded-full"
                    style={{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  R$ {goal.current.toLocaleString()} de R$ {goal.target.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Tela de Tarefas
  const TasksScreen = () => {
    const filteredTasks = getFilteredTasks()

    return (
      <div className="pb-20 bg-gradient-to-br from-orange-50 to-yellow-50 min-h-screen">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Tarefas</h1>
            <button 
              onClick={() => {
                setModalType('task')
                setEditingItem(null)
                setShowModal(true)
              }}
              className="p-2 bg-white rounded-xl shadow-sm"
            >
              <Plus className="w-5 h-5 text-orange-600" />
            </button>
          </div>

          {/* Progresso Geral */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Progresso Hoje</h3>
                <p className="text-gray-600">{completedTasks} de {totalTasks} tarefas concluídas</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-orange-500">{Math.round(taskProgress)}%</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-orange-500 to-yellow-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${taskProgress}%` }}
              ></div>
            </div>
          </div>

          {/* Busca e Filtros */}
          <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar tarefas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <button className="p-2 border border-gray-300 rounded-xl hover:bg-gray-50">
                <Filter className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => setTaskFilter('all')}
                className={`px-4 py-2 rounded-xl font-medium ${
                  taskFilter === 'all' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'
                }`}
              >
                Todas ({tasks.length})
              </button>
              <button 
                onClick={() => setTaskFilter('pending')}
                className={`px-4 py-2 rounded-xl font-medium ${
                  taskFilter === 'pending' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'
                }`}
              >
                Pendentes ({tasks.filter(t => !t.completed).length})
              </button>
              <button 
                onClick={() => setTaskFilter('completed')}
                className={`px-4 py-2 rounded-xl font-medium ${
                  taskFilter === 'completed' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'
                }`}
              >
                Concluídas ({completedTasks})
              </button>
            </div>
          </div>

          {/* Lista de Tarefas */}
          <div className="space-y-3 mb-6">
            {filteredTasks.map((task) => (
              <div key={task.id} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => {
                      setTasks(tasks.map(t => 
                        t.id === task.id ? { ...t, completed: !t.completed } : t
                      ))
                      if (!task.completed) addXP(5)
                    }}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      task.completed 
                        ? 'bg-orange-500 border-orange-500' 
                        : 'border-gray-300 hover:border-orange-500'
                    }`}
                  >
                    {task.completed && <CheckSquare className="w-4 h-4 text-white" />}
                  </button>
                  <div className="flex-1">
                    <p className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                      {task.title}
                    </p>
                    {task.description && (
                      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                    )}
                    <div className="flex items-center space-x-2 mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        task.priority === 'high' ? 'bg-red-100 text-red-600' :
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Média' : 'Baixa'}
                      </span>
                      <span className="text-xs text-gray-500">{task.category}</span>
                      <span className="text-xs text-gray-500">{task.dueDate}</span>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <button 
                      onClick={() => {
                        setEditingItem(task)
                        setModalType('task')
                        setShowModal(true)
                      }}
                      className="p-2 text-gray-400 hover:text-orange-600"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => {
                        setTasks(tasks.filter(t => t.id !== task.id))
                        addXP(2)
                      }}
                      className="p-2 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTasks.length === 0 && (
            <div className="text-center py-8">
              <CheckSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Nenhuma tarefa encontrada</p>
            </div>
          )}

          {/* Calendário Rápido */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Próximos Eventos</h3>
              <Calendar className="w-5 h-5 text-orange-500" />
            </div>
            <div className="space-y-3">
              {tasks.filter(task => !task.completed).slice(0, 3).map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-800">{task.title}</p>
                    <p className="text-sm text-gray-600">{task.category}</p>
                  </div>
                  <span className="text-orange-600 font-semibold text-sm">{task.dueDate}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Tela de Compras
  const ShoppingScreen = () => {
    const expiringItems = getExpiringItems()

    return (
      <div className="pb-20 bg-gradient-to-br from-yellow-50 to-orange-50 min-h-screen">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Compras</h1>
            <div className="flex space-x-2">
              <button 
                onClick={() => alert('Funcionalidade de scanner em desenvolvimento!')}
                className="p-2 bg-white rounded-xl shadow-sm"
              >
                <Scan className="w-5 h-5 text-yellow-600" />
              </button>
              <button 
                onClick={() => {
                  setModalType('shopping')
                  setEditingItem(null)
                  setShowModal(true)
                }}
                className="p-2 bg-white rounded-xl shadow-sm"
              >
                <Plus className="w-5 h-5 text-yellow-600" />
              </button>
            </div>
          </div>

          {/* Resumo da Lista */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Lista Atual</h3>
                <p className="text-gray-600">{shoppingItems.length} itens • R$ {shoppingTotal.toFixed(2)}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-yellow-600">
                  {completedShopping}/{shoppingItems.length}
                </p>
                <p className="text-sm text-gray-600">Coletados</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${shoppingItems.length > 0 ? (completedShopping / shoppingItems.length) * 100 : 0}%` }}
              ></div>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => {
                  const shareText = `Minha Lista de Compras:\n${shoppingItems.map(item => 
                    `${item.completed ? '✅' : '⬜'} ${item.name} (${item.quantity}x) - R$ ${(item.price * item.quantity).toFixed(2)}`
                  ).join('\n')}\n\nTotal: R$ ${shoppingTotal.toFixed(2)}`
                  
                  if (navigator.share) {
                    navigator.share({ text: shareText })
                  } else {
                    navigator.clipboard.writeText(shareText)
                    alert('Lista copiada para a área de transferência!')
                  }
                }}
                className="flex-1 bg-yellow-100 text-yellow-700 py-2 rounded-xl font-medium"
              >
                <Share2 className="w-4 h-4 inline mr-2" />
                Compartilhar
              </button>
              <button 
                onClick={() => alert('Receitas baseadas na sua lista em desenvolvimento!')}
                className="flex-1 bg-emerald-100 text-emerald-700 py-2 rounded-xl font-medium"
              >
                <ChefHat className="w-4 h-4 inline mr-2" />
                Receitas
              </button>
            </div>
          </div>

          {/* Alertas de Validade */}
          {expiringItems.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <h4 className="font-semibold text-red-800">Alertas de Validade</h4>
              </div>
              <p className="text-red-700 text-sm">
                {expiringItems.length} item(ns) vencem em breve: {expiringItems.map(item => item.name).join(', ')}
              </p>
            </div>
          )}

          {/* Lista de Compras */}
          <div className="space-y-3 mb-6">
            {shoppingItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => {
                      setShoppingItems(shoppingItems.map(i => 
                        i.id === item.id ? { ...i, completed: !i.completed } : i
                      ))
                      if (!item.completed) addXP(2)
                    }}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      item.completed 
                        ? 'bg-yellow-500 border-yellow-500' 
                        : 'border-gray-300 hover:border-yellow-500'
                    }`}
                  >
                    {item.completed && <CheckSquare className="w-4 h-4 text-white" />}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className={`font-medium ${item.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                        {item.name}
                      </p>
                      <p className="font-semibold text-gray-800">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-gray-600">Qtd: {item.quantity}</span>
                      <span className="text-sm text-gray-600">•</span>
                      <span className="text-sm text-gray-600">{item.category}</span>
                      {item.expiryDate && (
                        <>
                          <span className="text-sm text-gray-600">•</span>
                          <span className={`text-sm ${
                            expiringItems.some(exp => exp.id === item.id) ? 'text-red-600 font-medium' : 'text-gray-600'
                          }`}>
                            Validade: {item.expiryDate}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <button 
                      onClick={() => {
                        setEditingItem(item)
                        setModalType('shopping')
                        setShowModal(true)
                      }}
                      className="p-2 text-gray-400 hover:text-yellow-600"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => {
                        setShoppingItems(shoppingItems.filter(i => i.id !== item.id))
                        addXP(1)
                      }}
                      className="p-2 text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sugestões Inteligentes */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Sugestões Inteligentes</h3>
              <Zap className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="space-y-3">
              {[
                { name: 'Ovos', reason: 'Você compra toda semana', price: 6.00 },
                { name: 'Banana', reason: 'Promoção no mercado', price: 4.50 },
                { name: 'Detergente', reason: 'Acabando no estoque', price: 2.80 },
              ].map((suggestion, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-yellow-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-800">{suggestion.name}</p>
                    <p className="text-sm text-gray-600">{suggestion.reason}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">R$ {suggestion.price.toFixed(2)}</p>
                    <button 
                      onClick={() => {
                        const newItem: ShoppingItem = {
                          id: generateId(),
                          name: suggestion.name,
                          quantity: 1,
                          price: suggestion.price,
                          category: 'Sugestão',
                          completed: false
                        }
                        setShoppingItems(prev => [...prev, newItem])
                        addXP(3)
                      }}
                      className="text-xs bg-yellow-500 text-white px-2 py-1 rounded-full hover:bg-yellow-600"
                    >
                      Adicionar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Tela de Perfil
  const ProfileScreen = () => (
    <div className="pb-20 bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Perfil</h1>
          <button className="p-2 bg-white rounded-xl shadow-sm">
            <Settings className="w-5 h-5 text-purple-600" />
          </button>
        </div>

        {/* Perfil do Usuário */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Shield className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium text-yellow-600">
                  {user.isPremium ? 'Premium' : 'Gratuito'}
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-purple-600">{user.xp.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Pontos XP</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">{user.achievements}</p>
              <p className="text-sm text-gray-600">Conquistas</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">{user.level}</p>
              <p className="text-sm text-gray-600">Nível</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Progresso para o próximo nível</span>
              <span className="text-sm text-gray-600">
                {user.xp % 250}/250 XP
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                style={{ width: `${((user.xp % 250) / 250) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Integrações */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Integrações</h3>
          <div className="space-y-3">
            {[
              { name: 'Google Calendar', icon: Calendar, connected: true, color: 'text-blue-500' },
              { name: 'Banco do Brasil', icon: CreditCard, connected: true, color: 'text-yellow-600' },
              { name: 'WhatsApp', icon: Smartphone, connected: false, color: 'text-green-500' },
              { name: 'Gmail', icon: Mail, connected: false, color: 'text-red-500' },
            ].map((integration, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <integration.icon className={`w-6 h-6 ${integration.color}`} />
                  <span className="font-medium text-gray-800">{integration.name}</span>
                </div>
                <button 
                  onClick={() => {
                    alert(`${integration.connected ? 'Desconectar' : 'Conectar'} ${integration.name}`)
                  }}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    integration.connected 
                      ? 'bg-green-100 text-green-600 hover:bg-red-100 hover:text-red-600' 
                      : 'bg-gray-200 text-gray-600 hover:bg-purple-100 hover:text-purple-600'
                  }`}
                >
                  {integration.connected ? 'Conectado' : 'Conectar'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Preferências */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Preferências</h3>
          <div className="space-y-4">
            {[
              { key: 'notifications', name: 'Notificações Push' },
              { key: 'darkMode', name: 'Modo Escuro' },
              { key: 'autoSync', name: 'Sincronização Automática' },
              { key: 'cloudBackup', name: 'Backup na Nuvem' },
            ].map((pref) => (
              <div key={pref.key} className="flex items-center justify-between">
                <span className="text-gray-700">{pref.name}</span>
                <button 
                  onClick={() => {
                    setPreferences(prev => ({
                      ...prev,
                      [pref.key]: !prev[pref.key as keyof typeof preferences]
                    }))
                  }}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    preferences[pref.key as keyof typeof preferences] ? 'bg-purple-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    preferences[pref.key as keyof typeof preferences] ? 'translate-x-6' : 'translate-x-1'
                  }`}></div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Plano Premium */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold">Plano {user.isPremium ? 'Premium' : 'Gratuito'}</h3>
              <p className="text-purple-100">
                {user.isPremium ? 'Recursos ilimitados' : 'Upgrade para Premium'}
              </p>
            </div>
            <Shield className="w-12 h-12 text-purple-200" />
          </div>
          <div className="space-y-2 mb-4">
            <div className="flex items-center space-x-2">
              <CheckSquare className="w-4 h-4" />
              <span className="text-sm">Relatórios avançados</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckSquare className="w-4 h-4" />
              <span className="text-sm">Sincronização ilimitada</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckSquare className="w-4 h-4" />
              <span className="text-sm">Suporte prioritário</span>
            </div>
          </div>
          <button 
            onClick={() => {
              setUser(prev => ({ ...prev, isPremium: !prev.isPremium }))
              alert(user.isPremium ? 'Plano cancelado!' : 'Bem-vindo ao Premium!')
            }}
            className="w-full bg-white text-purple-600 py-2 rounded-xl font-semibold hover:bg-gray-100"
          >
            {user.isPremium ? 'Gerenciar Assinatura' : 'Assinar Premium'}
          </button>
        </div>

        {/* Ações */}
        <div className="space-y-3">
          <button 
            onClick={() => {
              const data = { transactions, tasks, shoppingItems, goals, user, preferences }
              const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = 'vida-organizada-backup.json'
              a.click()
              URL.revokeObjectURL(url)
              addXP(10)
            }}
            className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:bg-gray-50"
          >
            <div className="flex items-center space-x-3">
              <Download className="w-5 h-5 text-gray-600" />
              <span className="text-gray-800">Exportar Dados</span>
            </div>
            <span className="text-gray-400">→</span>
          </button>
          <button 
            onClick={() => alert('Termos de uso e política de privacidade')}
            className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:bg-gray-50"
          >
            <div className="flex items-center space-x-3">
              <FileText className="w-5 h-5 text-gray-600" />
              <span className="text-gray-800">Termos de Uso</span>
            </div>
            <span className="text-gray-400">→</span>
          </button>
          <button 
            onClick={() => {
              if (confirm('Tem certeza que deseja sair?')) {
                setIsLoggedIn(false)
                setCurrentScreen('home')
              }
            }}
            className="w-full flex items-center justify-center p-4 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100"
          >
            Sair da Conta
          </button>
        </div>
      </div>
    </div>
  )

  // Renderização das telas
  const renderScreen = () => {
    switch (currentScreen) {
      case 'home': return <HomeScreen />
      case 'finances': return <FinancesScreen />
      case 'tasks': return <TasksScreen />
      case 'shopping': return <ShoppingScreen />
      case 'profile': return <ProfileScreen />
      default: return <HomeScreen />
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative">
      {renderScreen()}
      <Navigation />
      <FormModal />
    </div>
  )
}