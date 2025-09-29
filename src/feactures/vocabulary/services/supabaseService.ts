import { supabase } from "../../core/lib/supabaseClient";
import type { Word } from "../interfaces/vocabulary.interface";
import dayjs from "dayjs";



export const insertWord = async (newWord: Omit<Word, "id">): Promise<Word[]> => {
    const {data: { user }, error: userError} = await supabase.auth.getUser();
      if (userError || !user) {
        console.error("User not authenticated:", userError?.message);
        return [];
      }

      console.log("user.id", user.id);
  
  const { data, error } = await supabase
    .from("Word")
    .insert([{...newWord, user_id: user.id}])
    .select();

  if (error) {
    console.error("Error inserting word:", error.message);
    return [];
  }

  return data as Word[];
};

export const getWords = async (): Promise<Word[]> => {
  const {data: { user }, error: userError} = await supabase.auth.getUser();
    if (userError || !user) {
      console.error("User not authenticated:", userError?.message);
      return [];
    }
  const { data, error } = await supabase.from("Word").select().eq("user_id", user.id);

  if (error) {
    console.error("Error fetching words:", error.message);
    return [];
  }

  return data as Word[];
};

export const updateWordSupabase = async (word: Word): Promise<Word[]> => {
  const {data: { user }, error: userError} = await supabase.auth.getUser();
    if (userError || !user) {
      console.error("User not authenticated:", userError?.message);
      return [];
    }
  const { data, error } = await supabase
    .from("Word")
    .update({ ...word, user_id: user.id })
    .eq("id", word.id)
    .select();

  if (error) {
    console.error("Error updating word:", error.message);
    return [];
  }

  return data as Word[];
};

export const getWordByReviewDate = async (): Promise<Word[]> => {
  const {data: { user }, error: userError} = await supabase.auth.getUser();
    if (userError || !user) {
      console.error("User not authenticated:", userError?.message);
      return [];
    }
  const today = dayjs().format("YYYY-MM-DD");
  console.log(today);
  const { data, error } = await supabase.from("Word").select().eq("nextReviewDate", today).eq("user_id", user.id);
  console.log("data", data);

  if (error) {
    console.error("Error fetching words:", error.message);
    return [];
  }

  return data as Word[];
};