require_relative '../models/payment'

path = File.join(File.dirname(__FILE__), '../dist/today.json')
data = File.read path
Order.destroy_all
Order.create! filename: 'test.json', payload: data
