import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export async function POST(request) {
  try {
    const body = await request.json();
    const { customer_name, customer_email, whatsapp_number, product_id, custom_text, total_price } = body;

    if (!customer_name || !customer_email || !whatsapp_number || !product_id) {
      return NextResponse.json({ error: 'Missing required customer parameters.' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('orders')
      .insert([{ customer_name, customer_email, whatsapp_number, product_id, custom_text, total_price }])
      .select();

    if (error) throw error;

    return NextResponse.json({ success: true, order: data[0] }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}