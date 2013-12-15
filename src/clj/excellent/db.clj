(ns excellent.db
  (:require [monger.core :as mg]
            [monger.collection :as coll]
            [iron-mq-clojure.client :as mq])
  (:import [org.bson.types ObjectId]))

(defn getenv [env]
  (try
    (or (-> (str "/Users/matthewmolloy/." env) slurp .trim) (System/getenv env))
    (catch Exception e (System/getenv env))
    ))

(def mongohq-url (atom nil))
(defn set-db! []
  (when-not @mongohq-url
    (reset! mongohq-url (getenv "MONGOHQ_URL"))
    (mg/connect-via-uri! @mongohq-url)
    (mg/set-db! (mg/get-db "app19742350"))))

(defn insert [name str]
  (set-db!)
  (coll/remove "files" {:_id name})
  (coll/insert "files" {:_id name :str str}))

(defn get-all []
  (set-db!)
  (map :_id (coll/find-maps "files")))

(defn select [name]
  (set-db!)
  (get (coll/find-one "files" {:_id name}) "str"))

(defn delete [name]
  (set-db!)
  (coll/remove "files" {:_id name}))
