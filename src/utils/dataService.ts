import { supabase } from "@/integrations/supabase/client";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  projectType: string;
  place: string;
  message: string;
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  projectType: string;
  place: string;
  description: string;
  createdAt: string;
}

// Helper to map DB row to Lead
const mapLead = (row: any): Lead => ({
  id: row.id,
  name: row.name,
  phone: row.phone,
  email: row.email,
  projectType: row.project_type,
  place: row.place,
  message: row.message,
  createdAt: row.created_at,
});

// Helper to map DB row to GalleryItem
const mapGallery = (row: any): GalleryItem => ({
  id: row.id,
  imageUrl: row.image_url,
  projectType: row.project_type,
  place: row.place,
  description: row.description,
  createdAt: row.created_at,
});

// Leads
export const getLeads = async (): Promise<Lead[]> => {
  const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []).map(mapLead);
};

export const addLead = async (lead: Omit<Lead, "id" | "createdAt">): Promise<Lead> => {
  const { data, error } = await supabase.from("leads").insert({
    name: lead.name,
    phone: lead.phone,
    email: lead.email,
    project_type: lead.projectType,
    place: lead.place,
    message: lead.message,
  }).select().single();
  if (error) throw error;
  return mapLead(data);
};

export const deleteLead = async (id: string) => {
  const { error } = await supabase.from("leads").delete().eq("id", id);
  if (error) throw error;
};

// Storage
export const uploadGalleryImage = async (file: File): Promise<string> => {
  const ext = file.name.split('.').pop();
  const fileName = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("gallery").upload(fileName, file);
  if (error) throw error;
  const { data } = supabase.storage.from("gallery").getPublicUrl(fileName);
  return data.publicUrl;
};

export const deleteGalleryImage = async (imageUrl: string) => {
  const parts = imageUrl.split("/gallery/");
  if (parts.length > 1) {
    const fileName = parts[1];
    await supabase.storage.from("gallery").remove([fileName]);
  }
};

// Gallery
export const getGallery = async (): Promise<GalleryItem[]> => {
  const { data, error } = await supabase.from("gallery").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []).map(mapGallery);
};

export const addGalleryItem = async (item: Omit<GalleryItem, "id" | "createdAt">): Promise<GalleryItem> => {
  const { data, error } = await supabase.from("gallery").insert({
    image_url: item.imageUrl,
    project_type: item.projectType,
    place: item.place,
    description: item.description,
  }).select().single();
  if (error) throw error;
  return mapGallery(data);
};

export const deleteGalleryItem = async (id: string, imageUrl?: string) => {
  if (imageUrl) await deleteGalleryImage(imageUrl);
  const { error } = await supabase.from("gallery").delete().eq("id", id);
  if (error) throw error;
};

export const updateGalleryItem = async (id: string, data: Partial<GalleryItem>) => {
  const updateData: any = {};
  if (data.projectType !== undefined) updateData.project_type = data.projectType;
  if (data.place !== undefined) updateData.place = data.place;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.imageUrl !== undefined) updateData.image_url = data.imageUrl;
  const { error } = await supabase.from("gallery").update(updateData).eq("id", id);
  if (error) throw error;
};

// Auth - using Supabase Auth
export const adminLogin = async (email: string, password: string): Promise<boolean> => {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  return !error;
};

export const isAdminLoggedIn = async (): Promise<boolean> => {
  const { data } = await supabase.auth.getSession();
  return !!data.session;
};

export const adminLogout = async () => {
  await supabase.auth.signOut();
};
