import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function groupConversationsByDate(conversations: {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  title: string;
}[]) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  
  const sevenDaysAgo = new Date(today)
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  
  const thirtyDaysAgo = new Date(today)
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  
  const groups: Record<string, typeof conversations> = {
      "Today": [],
      "Yesterday": [],
      "7 days": [],
      "30 days": [],
  }
  
  // Initialize month groups dynamically
  const monthGroups: Record<string, typeof conversations> = {}
  
  // First sort all conversations by createdAt (newest first)
  const sortedConversations = [...conversations].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
  
  sortedConversations.forEach(conversation => {
      const convDate = new Date(conversation.updatedAt)
      
      if (convDate >= today) {
          groups["Today"].push(conversation)
      } else if (convDate >= yesterday) {
          groups["Yesterday"].push(conversation)
      } else if (convDate >= sevenDaysAgo) {
          groups["7 days"].push(conversation)
      } else if (convDate >= thirtyDaysAgo) {
          groups["30 days"].push(conversation)
      } else {
          // Group by month-year for older conversations
          const monthYear = convDate.toISOString().slice(0, 7) // YYYY-MM format
          if (!monthGroups[monthYear]) {
              monthGroups[monthYear] = []
          }
          monthGroups[monthYear].push(conversation)
      }
  })
  
  // Merge all groups
  const result: Record<string, typeof conversations> = {}
  
  // Add time-based groups if they have items
  for (const [name, items] of Object.entries(groups)) {
      if (items.length > 0) {
          result[name] = items
      }
  }
  
  // Add month-based groups sorted newest first
  const sortedMonthGroups = Object.entries(monthGroups)
      .sort(([a], [b]) => b.localeCompare(a)) // Sort by YYYY-MM descending
  
  for (const [monthYear, items] of sortedMonthGroups) {
      result[monthYear] = items
  }
  
  return result
}

