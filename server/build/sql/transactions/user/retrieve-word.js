"use strict";
// SELECT * FROM word_pairs
// INNER JOIN grammatical_info
// ON word_pairs.grammatical_info_id = grammatical_info.id
// INNER JOIN word_pair_auxiliary_info
// ON word_pairs.id = word_pair_auxiliary_info.word_pair_id
// INNER JOIN parent_word_auxiliary_info
// ON word_pairs.parent_id = parent_word_auxiliary_info
// WHERE parent_id = @PARENT_ID
// id, english, spanish, difficulty, grammatical-info, 
