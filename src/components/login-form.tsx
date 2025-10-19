import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
    Field,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'

type LoginFormProps = React.ComponentProps<'div'> & {
    setAuthTab?: (tab: string) => void
}

export function LoginForm({
    className,
    setAuthTab,
    ...props
}: LoginFormProps) {
    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <Card>
                <CardContent>
                    <form>
                        <FieldGroup className="gap-3">
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="xyz@example.com"
                                />
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">
                                        Password
                                    </FieldLabel>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="****"
                                    required
                                />
                            </Field>
                            <Field>
                                <Button
                                    type="submit"
                                    className="cursor-pointer"
                                >
                                    Login
                                </Button>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
