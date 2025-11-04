import { supabase } from "../../core/lib/supabaseClient";
import type { GrammarTopic } from "../interfaces/grammar.interface";

//import dayjs from "dayjs";

export const getGrammarTopics = async (): Promise<GrammarTopic[]> => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    console.error("User not authenticated:", userError?.message);
    return [];
  }
  const { data, error } = await supabase
    .from("GrammarTopic")
    .select()
    .eq("user_id", user.id);

  if (error) {
    console.error("Error fetching grammar topics:", error.message);
    return [];
  }

  return data as GrammarTopic[];
};

export const getGrammarTopicById = async (id: string): Promise<GrammarTopic | null> => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    console.error("User not authenticated:", userError?.message);
    return null;
  }
  const { data, error } = await supabase
    .from("GrammarTopic")
    .select()
    .eq("user_id", user.id)
    .eq("id", id);

  if (error) {
    console.error("Error fetching grammar topic:", error.message);
    return null;
  }

  return data[0] as GrammarTopic;
};

export const insertGrammarTopic = async ( newGrammarTopic: Omit<GrammarTopic, "id">): Promise<GrammarTopic[]> => {
  try {
    if (!newGrammarTopic || Object.keys(newGrammarTopic).length === 0) {
      throw new Error("Grammar topic data is required");
    }
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      throw new Error(`Authentication error: ${userError.message}`);
    }
    
    if (!user) {
      throw new Error("User not authenticated");
    }

    console.log("Authenticated user ID:", user.id);
    console.log("newGrammarTopic", {...newGrammarTopic, user_id: user.id});

    const { data, error: insertError } = await supabase
      .from("GrammarTopic")
      .insert([{ ...newGrammarTopic, user_id: user.id }])
      .select();

    if (insertError) {
      throw new Error(`Database insertion error: ${insertError.message}`);
    }

    if (!data || data.length === 0) {
      throw new Error("No data returned after insertion");
    }

    console.log("Grammar topic inserted successfully:", data);
    return data as GrammarTopic[];

  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in insertGrammarTopic:", {
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      });
    } else {
      console.error("Unknown error in insertGrammarTopic:", error);
    }
    throw error;
  }
};