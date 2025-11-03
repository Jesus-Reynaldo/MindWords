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
