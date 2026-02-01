import { supabase } from './supabaseClient'

export type IssueResult = {
  success: boolean
  error?: string
  assignmentId?: string
}

export type ReturnResult = {
  success: boolean
  error?: string
}

/**
 * Issue an item to a user
 */
export async function issueItem(itemCode: string, userId: string, dueDate?: Date): Promise<IssueResult> {
  try {
    // Find the item by code
    const { data: item, error: itemError } = await supabase
      .from('items')
      .select('id, status, product_id')
      .eq('code', itemCode)
      .single()

    if (itemError || !item) {
      return { success: false, error: `Item with code "${itemCode}" not found` }
    }

    if (item.status !== 'in_stock') {
      return { success: false, error: `Item is not available. Current status: ${item.status}` }
    }

    // Find or create user record
    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('auth_user_id', userId)
      .maybeSingle()

    if (!user) {
      return { success: false, error: 'User record not found. Please contact administrator.' }
    }

    // Create assignment
    const { data: assignment, error: assignmentError } = await supabase
      .from('assignments')
      .insert({
        item_id: item.id,
        user_id: user.id,
        status: 'issued',
        due_at: dueDate?.toISOString() || null,
      })
      .select('id')
      .single()

    if (assignmentError) {
      return { success: false, error: `Failed to create assignment: ${assignmentError.message}` }
    }

    // Update item status
    const { error: updateError } = await supabase
      .from('items')
      .update({ status: 'issued' })
      .eq('id', item.id)

    if (updateError) {
      return { success: false, error: `Failed to update item status: ${updateError.message}` }
    }

    return { success: true, assignmentId: assignment.id }
  } catch (err: any) {
    return { success: false, error: err?.message ?? 'Unknown error occurred' }
  }
}

/**
 * Return an item to stock
 */
export async function returnItem(itemCode: string): Promise<ReturnResult> {
  try {
    // Find the item by code
    const { data: item, error: itemError } = await supabase
      .from('items')
      .select('id, status')
      .eq('code', itemCode)
      .single()

    if (itemError || !item) {
      return { success: false, error: `Item with code "${itemCode}" not found` }
    }

    if (item.status !== 'issued') {
      return { success: false, error: `Item is not currently issued. Current status: ${item.status}` }
    }

    // Find the latest assignment
    const { data: assignment, error: assignmentError } = await supabase
      .from('assignments')
      .select('id')
      .eq('item_id', item.id)
      .eq('status', 'issued')
      .order('issued_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (assignmentError || !assignment) {
      return { success: false, error: 'No active assignment found for this item' }
    }

    // Update assignment to returned
    const { error: updateAssignmentError } = await supabase
      .from('assignments')
      .update({
        status: 'returned',
        returned_at: new Date().toISOString(),
      })
      .eq('id', assignment.id)

    if (updateAssignmentError) {
      return { success: false, error: `Failed to update assignment: ${updateAssignmentError.message}` }
    }

    // Update item status
    const { error: updateItemError } = await supabase
      .from('items')
      .update({ status: 'in_stock' })
      .eq('id', item.id)

    if (updateItemError) {
      return { success: false, error: `Failed to update item status: ${updateItemError.message}` }
    }

    return { success: true }
  } catch (err: any) {
    return { success: false, error: err?.message ?? 'Unknown error occurred' }
  }
}

