// SELECT id, english, spanish, parent_id, difficulty, notes FROM  word_pairs
// INNER JOIN difficulties ON word_pairs.id = difficulties.word_pair_id;
// WHERE difficulties.user_id = @USER_ID

// id, english, spanish, difficulty, notes