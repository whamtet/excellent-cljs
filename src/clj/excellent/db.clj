(ns excellent.db
  (:require [monger.core :as mg]
            [monger.collection :as coll])
  (:import [org.bson.types ObjectId]))

(defn getenv [env]
  (try
    (-> (str "/Users/matthewmolloy/." env) slurp .trim)
    (catch java.io.FileNotFoundException e (System/getenv env))
    ))

(def iron-cache-token (getenv "IRON_CACHE_TOKEN"))
(def iron-cache-project-id (getenv "IRON_CACHE_PROJECT_ID"))


(defn save [name str]
  (coll/insert "files" {:name name :str str}))

(defn get-all []
  (map :name (coll/find-maps "files")))

(defn load-str [name]
  (get (coll/find-one "files" {:name name}) "name"))


