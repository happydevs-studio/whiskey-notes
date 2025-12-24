import { supabase } from './supabase'
import { Whiskey } from './types'
import { generateId } from './utils'

export const whiskeyService = {
  // Fetch all whiskeys from Supabase
  async fetchWhiskeys(): Promise<Whiskey[]> {
    try {
      const { data, error } = await supabase
        .from('whiskeys')
        .select('*')
        .order('createdAt', { ascending: false })

      if (error) {
        console.error('Error fetching whiskeys:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Error fetching whiskeys:', error)
      return []
    }
  },

  // Add a new whiskey to Supabase
  async addWhiskey(whiskey: Omit<Whiskey, 'id' | 'createdAt'>): Promise<Whiskey | null> {
    try {
      const newWhiskey = {
        ...whiskey,
        id: generateId(),
        createdAt: Date.now()
      }

      const { data, error } = await supabase
        .from('whiskeys')
        .insert([newWhiskey])
        .select()
        .single()

      if (error) {
        console.error('Error adding whiskey:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error adding whiskey:', error)
      return null
    }
  },

  // Update a whiskey in Supabase
  async updateWhiskey(id: string, updates: Partial<Omit<Whiskey, 'id' | 'createdAt'>>): Promise<Whiskey | null> {
    try {
      const { data, error } = await supabase
        .from('whiskeys')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Error updating whiskey:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error updating whiskey:', error)
      return null
    }
  },

  // Delete a whiskey from Supabase
  async deleteWhiskey(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('whiskeys')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting whiskey:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Error deleting whiskey:', error)
      return false
    }
  }
}
