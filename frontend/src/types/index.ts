export interface User {
  id: string
  name: string
  email: string
  role?: string
  createdAt?: string
  updatedAt?: string
}


export interface RegisterInput {
  full_name: string
  email: string
  password: string
}


export interface LoginInput {
  email: string
  password: string
}

export interface Idea {
  id: string
  title: string
  description?: string | null
  authorId: string
  author?: User
  countVotes?: number
  comments?: Comment[]
  votes?: Vote[]
  createdAt: string
  updatedAt?: string
}

export interface Comment {
  id: string
  ideaId: string
  authorId: string
  author?: User
  content: string
  createdAt: string
  updatedAt?: string
}

export interface Vote {
  id: string
  ideaId: string
  userId: string
  createdAt: string
}

export interface Category {
  id: string
  title: string
  description?: string | null
  icon?: string | null
  color?: string | null
  createdAt?: string
  updatedAt?: string
  created_at?: string
  updated_at?: string
  transactions?: { id: string; value: number }[]
}

export interface Transaction {
  id: string
  type: string
  description?: string | null
  date: string
  value: number
  amount?: number
  category_id?: string
  category?: { id: string; title: string }
  user?: { id: string; full_name?: string; name?: string }
}

