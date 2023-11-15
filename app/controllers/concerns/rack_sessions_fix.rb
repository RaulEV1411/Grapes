module RackSessionsFix
extend ActiveSupport::Concern
    class FakeRackSession < Hash
        before_action :set_fake_session

            def enabled?
                false
            end

            def destroy; end

    end
            included do
        private
        def set_fake_session
                request.env['rack.session'] ||= FakeRackSession.new
        end
    end
end